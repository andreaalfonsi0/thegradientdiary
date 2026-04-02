<script>
  // Destructure props from $props()
  // initialGravity is the value passed from MDX
  let { initialGravity = 9.8 } = $props();

  // 1. State: The "knobs" the user can turn
  let gravity = $state(initialGravity); 
  let height = $state(0);    // Current position of the ball
  let velocity = $state(0);  // Current speed
  let isRunning = $state(false);
  let time = $state(0);

  // 2. Derived: Values that update automatically based on state
  // Formula for potential energy: PE = mgh (assuming mass = 1)
  let potentialEnergy = $derived((gravity * (200 - height)).toFixed(0));

  // 3. The "Engine": A simple physics loop
  $effect(() => {
    let frame;
    if (isRunning) {
      const update = () => {
        // Simple Physics logic
        velocity += gravity * 0.016; // 0.016 is approx 1 frame at 60fps
        height += velocity * 0.016;

        // Collision detection (floor at 200px)
        if (height > 200) {
          height = 200;
          velocity *= -0.7; // Bounce with energy loss
        }

        time += 0.016;
        frame = requestAnimationFrame(update);
      };
      frame = requestAnimationFrame(update);
    }
    return () => cancelAnimationFrame(frame); // Cleanup
  });

  function reset() {
    height = 0;
    velocity = 0;
    time = 0;
    isRunning = false;
  }
</script>

<div class="explorable-container">
  <div class="controls">
    <label>
      <strong>Gravity: {gravity} m/s²</strong>
      <input type="range" bind:value={gravity} min="1" max="30" step="0.1" />
    </label>
    
    <div class="stats">
      <p>Velocity: <b>{velocity.toFixed(1)} px/s</b></p>
      <p>Potential Energy: <b>{potentialEnergy} J</b></p>
    </div>

    <button onclick={() => isRunning = !isRunning}>
      {isRunning ? 'Pause' : 'Drop Ball'}
    </button>
    <button onclick={reset}>Reset</button>
  </div>

  <div class="stage">
    <div 
      class="ball" 
      style:transform="translateY({height}px)"
    ></div>
    <div class="floor"></div>
  </div>
</div>

<style>
  .explorable-container {
    display: flex;
    gap: 2rem;
    padding: 1.5rem;
    background: #f4f4f4;
    border-radius: 8px;
    border: 1px solid #ddd;
    color: #333;
  }

  .controls { flex: 1; display: flex; flex-direction: column; gap: 1rem; }
  
  .stage {
    position: relative;
    width: 150px;
    height: 230px;
    background: white;
    border: 1px dashed #ccc;
    overflow: hidden;
  }

  .ball {
    width: 30px;
    height: 30px;
    background: #ff3e00;
    border-radius: 50%;
    margin: 0 auto;
  }

  .floor {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4px;
    background: #333;
  }

  input[type="range"] { width: 100%; }
</style>