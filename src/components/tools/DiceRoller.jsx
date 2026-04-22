import { useState } from 'react';
import { trackEvent } from '../../utils/analytics.js';

const DICE = [
  { sides: 4,  colour: '#c53030' },
  { sides: 6,  colour: '#c05621' },
  { sides: 8,  colour: '#276749' },
  { sides: 10, colour: '#2b6cb0' },
  { sides: 12, colour: '#553c9a' },
  { sides: 20, colour: '#97266d' },
];

const makePool = () => Object.fromEntries(DICE.map(d => [d.sides, 0]));

function rollWithExplosion(sides) {
  const rolls = [];
  let roll;
  do {
    roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
  } while (roll === sides);
  return { rolls, total: rolls.reduce((a, b) => a + b, 0) };
}

function DieCard({ sides, colour, count, onDecrement, onIncrement }) {
  const active = count > 0;
  return (
    <div className="die-card" style={active ? { borderColor: colour } : {}}>
      <div
        className="die-card-label"
        style={active ? { background: colour, color: '#fff' } : { color: colour }}
      >
        d{sides}
      </div>
      <div className="die-card-stepper">
        <button className="die-card-btn" onClick={onDecrement} disabled={count <= 0}>−</button>
        <span className="die-card-count" style={active ? { color: colour } : {}}>
          {count}
        </span>
        <button className="die-card-btn" onClick={onIncrement} disabled={count >= 10}>+</button>
      </div>
    </div>
  );
}

function DieButton({ sides, colour, isSelected, onClick, small = false }) {
  return (
    <button
      className={small ? 'die-btn die-btn--sm' : 'die-btn'}
      aria-pressed={isSelected}
      onClick={onClick}
      style={{
        borderColor: colour,
        borderWidth: isSelected ? 3 : 2,
        background: isSelected ? colour : 'transparent',
        color: isSelected ? '#fff' : colour,
      }}
    >
      d{sides}
    </button>
  );
}

function Stepper({ value, onDecrement, onIncrement, min = 1, max = 10 }) {
  return (
    <div className="dice-stepper">
      <button className="stepper-btn" onClick={onDecrement} disabled={value <= min}>−</button>
      <span className="stepper-value">{value}</span>
      <button className="stepper-btn" onClick={onIncrement} disabled={value >= max}>+</button>
    </div>
  );
}

function RollChain({ rolls, maxSides, colour }) {
  const exploded = rolls.length > 1;
  return (
    <span className="dice-result-rolls">
      {rolls.map((r, i) => (
        <span key={i}>
          <span style={{ color: r === maxSides ? colour : 'var(--text)', fontWeight: r === maxSides ? 700 : 400 }}>
            {r}
          </span>
          {i < rolls.length - 1 && <span className="dice-chain-sep"> ✦ </span>}
        </span>
      ))}
      {exploded && (
        <>
          <span className="dice-equals"> = </span>
          <strong>{rolls.reduce((a, b) => a + b, 0)}</strong>
          <span className="dice-explode-badge">exploded</span>
        </>
      )}
    </span>
  );
}

const MODES = ['standard', 'advantage', 'disadvantage'];

export default function DiceRoller() {
  const [counts, setCounts]           = useState(makePool());
  const [mode, setMode]               = useState('standard');
  const [pushDieType, setPushDieType] = useState(null);
  const [pushCount, setPushCount]     = useState(1);
  const [results, setResults]         = useState(null);

  const activeTypes    = DICE.filter(d => counts[d.sides] > 0);
  const totalDice      = activeTypes.reduce((s, d) => s + counts[d.sides], 0);
  const showModeToggle = totalDice > 1;
  const poolSummary    = activeTypes.map(d => `${counts[d.sides]}d${d.sides}`).join(' + ');

  function changeCount(sides, delta) {
    setCounts(prev => ({ ...prev, [sides]: Math.max(0, Math.min(10, prev[sides] + delta)) }));
    setResults(null);
  }

  function selectPushDie(sides) {
    setPushDieType(prev => (prev === sides ? null : sides));
    setResults(null);
  }

  function changePushCount(delta) {
    setPushCount(prev => Math.max(1, Math.min(10, prev + delta)));
    setResults(null);
  }

  function roll() {
    if (activeTypes.length === 0) return;

    const effectiveMode = showModeToggle ? mode : 'standard';

    const rolledByType = {};
    activeTypes.forEach(({ sides }) => {
      rolledByType[sides] = Array.from({ length: counts[sides] }, () => rollWithExplosion(sides));
    });

    let chosenSides = null;
    let chosenIndex = null;
    let poolResult;

    if (effectiveMode !== 'standard') {
      const allDice = activeTypes.flatMap(({ sides }) =>
        rolledByType[sides].map((d, i) => ({ sides, index: i, total: d.total }))
      );
      const chosen = allDice.reduce((best, d) =>
        effectiveMode === 'advantage' ? (d.total > best.total ? d : best) : (d.total < best.total ? d : best)
      );
      chosenSides = chosen.sides;
      chosenIndex = chosen.index;
      poolResult  = chosen.total;
    } else {
      poolResult = activeTypes.reduce(
        (sum, { sides }) => sum + rolledByType[sides].reduce((s, d) => s + d.total, 0), 0
      );
    }

    const pushDice  = pushDieType
      ? Array.from({ length: pushCount }, () => rollWithExplosion(pushDieType))
      : [];
    const pushResult = pushDice.reduce((s, d) => s + d.total, 0);

    setResults({
      rolledByType,
      activeTypes: [...activeTypes],
      effectiveMode,
      chosenSides,
      chosenIndex,
      poolResult,
      pushDice,
      pushResult,
      finalTotal: poolResult + pushResult,
    });

    trackEvent('roll_dice', {
      pool: poolSummary,
      mode: effectiveMode,
      push_die: pushDieType ?? 'none',
      push_count: pushDieType ? pushCount : 0,
    });
  }

  const activePushDie = DICE.find(d => d.sides === pushDieType);

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Dice Roller</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Build a dice pool and roll. Dice explode on their maximum value.
        </p>
      </div>

      {/* Die cards */}
      <div className="dice-cards">
        {DICE.map(({ sides, colour }) => (
          <DieCard
            key={sides}
            sides={sides}
            colour={colour}
            count={counts[sides]}
            onDecrement={() => changeCount(sides, -1)}
            onIncrement={() => changeCount(sides, +1)}
          />
        ))}
      </div>

      {/* Pool summary */}
      {activeTypes.length > 0 && (
        <p className="dice-pool-summary-text">
          {poolSummary}
        </p>
      )}

      {/* Mode toggle — only when a single die type has count > 1 */}
      {showModeToggle && (
        <div className="dice-mode-row">
          {MODES.map(m => (
            <button
              key={m}
              className={`dice-mode-btn${mode === m ? ' dice-mode-btn--active' : ''}`}
              onClick={() => { setMode(m); setResults(null); }}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Push dice */}
      {activeTypes.length > 0 && (
        <div className="dice-push-section">
          <p className="result-section-title">
            Push Dice
            <span className="dice-push-hint"> — added to your result</span>
          </p>
          <div className="dice-selector">
            {DICE.map(({ sides, colour }) => (
              <DieButton
                key={sides}
                sides={sides}
                colour={colour}
                isSelected={pushDieType === sides}
                onClick={() => selectPushDie(sides)}
                small
              />
            ))}
          </div>
          {pushDieType && (
            <div className="dice-pool-row" style={{ marginTop: '0.75rem' }}>
              <span className="dice-pool-label">Count</span>
              <Stepper
                value={pushCount}
                onDecrement={() => changePushCount(-1)}
                onIncrement={() => changePushCount(+1)}
              />
              <span className="dice-pool-summary" style={{ color: activePushDie.colour }}>
                {pushCount}d{pushDieType}
              </span>
            </div>
          )}
        </div>
      )}

      <button
        className="btn btn-purple"
        style={{ marginTop: '1.5rem' }}
        onClick={roll}
        disabled={activeTypes.length === 0}
      >
        Roll
      </button>

      {results && (
        <div className="tool-result">

          {/* Results grouped by die type */}
          {results.activeTypes.map(({ sides, colour }, groupIdx) => {
            const dieRolls = results.rolledByType[sides];
            return (
              <div key={sides} style={groupIdx > 0 ? { marginTop: '1.25rem' } : {}}>
                <p className="result-section-title">
                  <span style={{ color: colour }}>{dieRolls.length}d{sides}</span>
                  {groupIdx === 0 && results.effectiveMode !== 'standard' && results.activeTypes.length === 1 && (
                    <span> — {results.effectiveMode === 'advantage' ? 'Advantage' : 'Disadvantage'}</span>
                  )}
                </p>
                <div className="dice-pool-results">
                  {dieRolls.map(({ rolls }, i) => {
                    const isChosen     = results.chosenSides === sides && results.chosenIndex === i;
                    const isEliminated = results.effectiveMode !== 'standard' && !isChosen;
                    return (
                      <div
                        key={i}
                        className={[
                          'dice-pool-result',
                          isChosen     ? 'dice-pool-result--chosen'     : '',
                          isEliminated ? 'dice-pool-result--eliminated' : '',
                        ].join(' ').trim()}
                        style={isChosen ? { borderColor: colour } : {}}
                      >
                        <RollChain rolls={rolls} maxSides={sides} colour={colour} />
                        {isChosen && (
                          <span className="dice-chosen-label">
                            {results.effectiveMode === 'advantage' ? '▲ highest' : '▼ lowest'}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Push dice results */}
          {results.pushDice.length > 0 && (
            <div style={{ marginTop: '1.25rem' }}>
              <p className="result-section-title">
                Push Dice ({results.pushDice.length}d{pushDieType})
              </p>
              <div className="dice-pool-results">
                {results.pushDice.map(({ rolls }, i) => (
                  <div key={i} className="dice-pool-result">
                    <RollChain rolls={rolls} maxSides={pushDieType} colour={activePushDie.colour} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total */}
          <div className="dice-total">
            {results.pushDice.length > 0 ? (
              <>
                <span className="dice-total-num">{results.poolResult}</span>
                <span className="dice-equals"> + </span>
                <span className="dice-total-num">{results.pushResult}</span>
                <span className="dice-equals"> = </span>
                <strong>{results.finalTotal}</strong>
              </>
            ) : (
              <strong>{results.finalTotal}</strong>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
