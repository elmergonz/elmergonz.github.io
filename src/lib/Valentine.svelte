<script>
    let question = $state(false);
    let started = $state(false);
    let heartFaded = $state(false);
    let noBtn = $state(null);

    const positionValues = [4, -4, 4, -4];

    let lastXY = [];

    function moveButton() {
        let x;
        let y;

        do {
            let randomIndex = Math.floor(Math.random() * positionValues.length);
            x = positionValues[randomIndex];

            randomIndex = Math.floor(Math.random() * positionValues.length);
            y = positionValues[randomIndex];

            console.log(JSON.stringify(lastXY) == JSON.stringify([x, y]));
        } while (JSON.stringify(lastXY) == JSON.stringify([x, y]));

        noBtn.style.transform = `translate(${x}em, ${y}em)`;

        lastXY = [x, y];
    }

    function startAnimation() {
        started = true;

        setTimeout(() => {
            heartFaded = true;

            setTimeout(() => {
                question = true;
            }, 500);
        }, 1500);
    }
</script>

<div class="content" id="content">
    {#if question}
        <div class="question-container fade-in">
            <h2>Would you be my Valentine? {"<3"}</h2>
            <div class="btn-container">
                <button
                    class="btn btn-yes"
                    onclick={() => {
                        alert("AAAAAAHHHHHHHHH\nMua mua mua mua\n:* :* :*");
                    }}>Yes</button
                >
                <button class="btn btn-no" bind:this={noBtn} onclick={moveButton}>No</button>
            </div>
        </div>
    {:else}
        <div
            class="heart {started ? 'heart-grow' : ''} {heartFaded
                ? 'fade'
                : ''}"
            id="heart"
        ></div>
        <button
            class="btn btn-start {started ? 'clicked' : ''}"
            id="start"
            onclick={startAnimation}>Start</button
        >
    {/if}
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    :root {
        overflow: hidden;
        font-family: Arial, Helvetica, sans-serif;
        --heart-scale: 1em;
    }

    .heart {
        position: relative;
        width: var(--heart-scale);
        height: var(--heart-scale);
        background-color: red;
        transform: rotate(-45deg);
        margin: 50px;
        transition:
            transform 2s,
            opacity 0.5s;
    }

    .heart-grow {
        transform: scale(150) rotate(-45deg);
    }

    .heart::before,
    .heart::after {
        content: "";
        position: absolute;
        width: var(--heart-scale);
        height: var(--heart-scale);
        background-color: red;
        border-radius: 50%;
    }

    .heart::before {
        top: calc(-1 * var(--heart-scale) / 2);
        left: 0;
    }

    .heart::after {
        top: 0;
        left: calc(var(--heart-scale) / 2);
    }

    .fade {
        opacity: 0;
    }

    .btn {
        border: 2px solid black;
        border-radius: 1em;
        background-color: transparent;
        color: black;
        padding: 0.5em 1em;
        font-size: 16px;
        cursor: pointer;
        transition:
            transform 0.2s,
            opacity 0.3s;
    }

    .btn.clicked {
        opacity: 0;
    }

    .btn-start {
        background-color: red;
        color: white;
        border-color: red;
    }

    .btn:hover {
        transform: scale(1.1);
    }

    .btn-yes {
        background-color: green;
        color: white;
        border-color: green;
    }

    .btn-no {
        background-color: red;
        color: white;
        border-color: red;
        transition: transform 0.5s ease-in-out;
    }

    .content {
        display: flex;
        flex-direction: column;
        padding-top: 3em;
        align-items: center;
        height: 100vh;
    }

    .btn-container {
        display: flex;
        justify-content: space-between;
        width: 10em;
    }

    .question-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 7em;
        opacity: 0;
        visibility: hidden;
        transition:
            opacity 1s ease,
            visibility 1s ease;
    }

    .fade-in {
        opacity: 1;
        visibility: visible;
    }
</style>
