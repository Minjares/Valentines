<script lang="ts">
    import { goto } from '$app/navigation';

    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    const cellSize = 40;
    const heartSize = 30;
    const mazeWidth = maze[0].length * cellSize;
    const mazeHeight = maze.length * cellSize;

    let heartPosition = $state({ x: cellSize, y: cellSize });
    let isSolved = $state(false);

    const destination = { x: mazeWidth - 2 * cellSize, y: mazeHeight - 2 * cellSize };

    function moveHeart(event: KeyboardEvent) {
        if (isSolved) return;

        const key = event.key;
        let newX = heartPosition.x;
        let newY = heartPosition.y;

        if (key === 'ArrowUp') newY -= cellSize;
        else if (key === 'ArrowDown') newY += cellSize;
        else if (key === 'ArrowLeft') newX -= cellSize;
        else if (key === 'ArrowRight') newX += cellSize;

        const col = Math.floor(newX / cellSize);
        const row = Math.floor(newY / cellSize);

        if (maze[row] && maze[row][col] === 0) {
            heartPosition.x = newX;
            heartPosition.y = newY;
        }

        if (heartPosition.x === destination.x && heartPosition.y === destination.y) {
            isSolved = true;
            console.log('Maze solved!');
            setTimeout(() => goto('/confirm'), 3000);
        }
    }

    function resetMaze() {
        heartPosition = { x: cellSize, y: cellSize };
        isSolved = false;
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-200 to-red-100 py-12 px-4 font-serif">
    <div class="max-w-2xl mx-auto text-center">
        <h1 class="text-4xl font-bold text-red-600 mb-4 animate-pulse">Laberinto del corazón 💝</h1>
        <p class="text-xl text-red-700 mb-8 italic">Navega hacia mi foto favorita</p>

        <button
            class="mb-6 px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-bold"
            on:click={resetMaze}
        >
            Reiniciar 🔄
        </button>

        <div
            class="maze-container relative mx-auto rounded-2xl bg-white/70 backdrop-blur-md shadow-xl overflow-hidden"
            style="width: {mazeWidth + 4}px; height: {mazeHeight + 4}px;"
            tabindex="0"
            on:keydown={moveHeart}
        >
            {#each maze as row, rowIndex}
                {#each row as cell, colIndex}
                    <div
                        class="absolute transition-colors duration-300"
                        style="
                            top: {rowIndex * cellSize + 2}px;
                            left: {colIndex * cellSize + 2}px;
                            width: {cellSize}px;
                            height: {cellSize}px;
                            background-color: {cell === 1 ? '#FFC0CB' : 'transparent'};
                        "
                    ></div>
                {/each}
            {/each}

            <div
                class="absolute transition-transform duration-200 animate-bounce text-3xl"
                style="
                    top: {heartPosition.y + 2}px;
                    left: {heartPosition.x + 2}px;
                    width: {heartSize}px;
                    height: {heartSize}px;
                "
            >
                💖
            </div>

            <div
                class="absolute transition-transform duration-300"
                style="
                    top: {destination.y + 2}px;
                    left: {destination.x + 2}px;
                    width: {cellSize}px;
                    height: {cellSize}px;
                "
            >
                <img
                    src="/images/IMG_4171.jpg"
                    alt="Nuestro Destino"
                    class="w-full h-full object-cover rounded-lg shadow-md"
                    draggable="false"
                />
            </div>
        </div>

        {#if isSolved}
            <div class="text-center mt-8 animate-fadeIn">
                <h2 class="text-3xl font-bold text-red-600 mb-4">Verguiaste 💖</h2>
                <p class="text-xl text-red-700">Sigamos...</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .maze-container {
        outline: none;
        border: 2px solid transparent;
    }

    .maze-container:focus {
        border-color: #FF69B4;
        box-shadow: 0 0 20px rgba(255, 182, 193, 0.6);
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .animate-fadeIn {
        animation: fadeIn 0.5s ease-out forwards;
    }
</style>