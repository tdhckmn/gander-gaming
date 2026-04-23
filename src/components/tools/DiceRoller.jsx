import { trackEvent } from '../../utils/analytics.js';
import { usePersisted } from '../../hooks/usePersisted.js';

const DICE = [
  { sides: 4,  colour: '#c53030' },
  { sides: 6,  colour: '#c05621' },
  { sides: 8,  colour: '#276749' },
  { sides: 12, colour: '#553c9a' },
  { sides: 20, colour: '#97266d' },
];

const OUTCOMES = [
  { min: 1,  max: 2,        label: 'No, and…',  detail: 'something else Detrimental happens.', type: 'detrimental' },
  { min: 3,  max: 4,        label: 'No, but…',  detail: 'something else Beneficial happens.',  type: 'beneficial'  },
  { min: 5,  max: 6,        label: 'Yes, but…', detail: 'something else Detrimental happens.', type: 'detrimental' },
  { min: 7,  max: 8,        label: 'Yes…',      detail: 'something as intended/expected happens.', type: 'neutral' },
  { min: 9,  max: Infinity, label: 'Yes, and…', detail: 'something else Beneficial happens.',  type: 'beneficial'  },
];

function getOutcome(total) {
  return OUTCOMES.find(o => total >= o.min && total <= o.max);
}

function rollWithExplosion(sides) {
  const rolls = [];
  let roll;
  do {
    roll = Math.floor(Math.random() * sides) + 1;
    rolls.push(roll);
  } while (roll === sides);
  return { rolls, total: rolls.reduce((a, b) => a + b, 0) };
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

function AdvDisStepper({ value, onDecrement, onIncrement }) {
  return (
    <div className="dice-stepper">
      <button className="stepper-btn" onClick={onDecrement} disabled={value <= 0}>−</button>
      <span className="stepper-value">{value}</span>
      <button className="stepper-btn" onClick={onIncrement} disabled={value >= 3}>+</button>
    </div>
  );
}

export default function DiceRoller() {
  const [dieType,      setDieType]      = usePersisted('grok-dice-type',        null);
  const [advantage,    setAdvantage]    = usePersisted('grok-dice-advantage',    0);
  const [disadvantage, setDisadvantage] = usePersisted('grok-dice-disadvantage', 0);
  const [result,       setResult]       = usePersisted('grok-dice-result',       null);

  const net      = advantage - disadvantage;
  const poolSize = 1 + Math.abs(net);

  function roll() {
    if (!dieType) return;

    const dice = Array.from({ length: poolSize }, () => rollWithExplosion(dieType));

    let keptIndex = 0;
    if (net > 0) {
      keptIndex = dice.reduce((best, d, i) => d.total > dice[best].total ? i : best, 0);
    } else if (net < 0) {
      keptIndex = dice.reduce((best, d, i) => d.total < dice[best].total ? i : best, 0);
    }

    const baseTotal = dice[keptIndex].total;

    setResult({ dieType, net, dice, keptIndex, baseTotal, pushes: [], runningTotal: baseTotal });
    trackEvent('roll_dice', { die: dieType, net_advantage: net });
  }

  function push() {
    if (!result) return;
    const pushRoll = rollWithExplosion(result.dieType);
    const newResult = {
      ...result,
      pushes: [...result.pushes, pushRoll],
      runningTotal: result.runningTotal + pushRoll.total,
    };
    setResult(newResult);
    trackEvent('roll_push', { die: result.dieType, push_number: result.pushes.length + 1 });
  }

  function resetModifiers() {
    setAdvantage(0);
    setDisadvantage(0);
    setResult(null);
  }

  const die     = DICE.find(d => d.sides === dieType);
  const outcome = result ? getOutcome(result.runningTotal) : null;

  function netLabel() {
    if (net === 0 && advantage > 0) return 'Cancel out — standard roll';
    if (net > 0)  return `Net ${net} Advantage — roll ${poolSize} dice, keep highest`;
    if (net < 0)  return `Net ${Math.abs(net)} Disadvantage — roll ${poolSize} dice, keep lowest`;
    return null;
  }

  return (
    <div className="tool-section">
      <div className="tool-header">
        <h2>Dice Roller</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.25rem' }}>
          Roll the dice, read the outcome. Dice explode on their maximum value.
        </p>
      </div>

      {/* Die selector */}
      <p className="result-section-title">Die</p>
      <div className="dice-selector">
        {DICE.map(({ sides, colour }) => (
          <button
            key={sides}
            className="die-btn"
            aria-pressed={dieType === sides}
            onClick={() => { setDieType(sides); setResult(null); }}
            style={{
              borderColor: colour,
              borderWidth: dieType === sides ? 3 : 2,
              background: dieType === sides ? colour : 'transparent',
              color: dieType === sides ? '#fff' : colour,
            }}
          >
            d{sides}
          </button>
        ))}
      </div>

      {/* Advantage / Disadvantage */}
      <div className="adv-dis-row">
        <div className="adv-dis-group">
          <span className="adv-dis-label adv-dis-label--adv">Advantage</span>
          <AdvDisStepper
            value={advantage}
            onDecrement={() => { setAdvantage(a => Math.max(0, a - 1)); setResult(null); }}
            onIncrement={() => { setAdvantage(a => Math.min(3, a + 1)); setResult(null); }}
          />
        </div>
        <div className="adv-dis-group">
          <span className="adv-dis-label adv-dis-label--dis">Disadvantage</span>
          <AdvDisStepper
            value={disadvantage}
            onDecrement={() => { setDisadvantage(d => Math.max(0, d - 1)); setResult(null); }}
            onIncrement={() => { setDisadvantage(d => Math.min(3, d + 1)); setResult(null); }}
          />
        </div>
        {(advantage > 0 || disadvantage > 0) && (
          <div className="adv-dis-net-wrap">
            <span className="adv-dis-net">{netLabel()}</span>
            <button className="adv-dis-clear" onClick={resetModifiers}>Clear</button>
          </div>
        )}
      </div>

      <button
        className="btn btn-purple"
        style={{ marginTop: '1.5rem' }}
        onClick={roll}
        disabled={!dieType}
      >
        Roll
      </button>

      {result && outcome && (
        <div className="tool-result">

          {/* Dice pool — shown when adv/dis produced multiple dice */}
          {result.dice.length > 1 && (
            <>
              <p className="result-section-title">
                {result.net > 0 ? `${result.net} Advantage` : `${Math.abs(result.net)} Disadvantage`}
                {' '}— {result.dice.length} dice rolled
              </p>
              <div className="dice-pool-results" style={{ marginBottom: '1.5rem' }}>
                {result.dice.map(({ rolls }, i) => {
                  const isKept = i === result.keptIndex;
                  return (
                    <div
                      key={i}
                      className={['dice-pool-result', isKept ? 'dice-pool-result--chosen' : 'dice-pool-result--eliminated'].join(' ')}
                      style={isKept ? { borderColor: die.colour } : {}}
                    >
                      <RollChain rolls={rolls} maxSides={result.dieType} colour={die.colour} />
                      {isKept && (
                        <span className="dice-chosen-label">
                          {result.net > 0 ? '▲ highest' : '▼ lowest'}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Single die result (standard, no pool) */}
          {result.dice.length === 1 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <RollChain rolls={result.dice[0].rolls} maxSides={result.dieType} colour={die.colour} />
            </div>
          )}

          {/* Push history */}
          {result.pushes.length > 0 && (
            <div className="dice-push-history">
              {result.pushes.map((p, i) => (
                <div key={i} className="dice-push-entry">
                  <span className="dice-push-number">Push {i + 1}</span>
                  <RollChain rolls={p.rolls} maxSides={result.dieType} colour={die.colour} />
                  <span className="dice-push-detriment">⚠ Detriment</span>
                </div>
              ))}
            </div>
          )}

          {/* Running total breakdown */}
          {result.pushes.length > 0 && (
            <div className="dice-running-total">
              <span className="dice-total-num">{result.baseTotal}</span>
              {result.pushes.map((p, i) => (
                <span key={i}>
                  <span className="dice-equals"> + </span>
                  <span className="dice-total-num" style={{ color: die.colour }}>{p.total}</span>
                </span>
              ))}
              <span className="dice-equals"> = </span>
              <strong className="dice-total-num">{result.runningTotal}</strong>
            </div>
          )}

          {/* Outcome */}
          <div className={`dice-outcome dice-outcome--${outcome.type}`}>
            <div className="dice-outcome-total">{result.runningTotal}</div>
            <div className="dice-outcome-label">{outcome.label}</div>
            <div className="dice-outcome-detail">{outcome.detail}</div>
          </div>

          {/* Push */}
          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={push}>
              Push
            </button>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {result.pushes.length === 0
                ? 'Pushing re-rolls your die and adds to the total — but incurs a Detriment.'
                : `${result.pushes.length} Detriment${result.pushes.length > 1 ? 's' : ''} incurred`}
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
