<script lang="ts">
    import { Confetti } from "svelte-confetti";
    import { onMount } from "svelte";
    
    let containerRef: HTMLDivElement;
    let noButtonPosition = $state({ x: 0, y: 0 });
    let showConfetti = $state(false);
    let isConfirmed = $state(false);
    
    onMount(async () => {
        try {
            const response = await fetch('/api/confirmation');
            const [data] = await response.json();
            isConfirmed = data?.confirmed ?? false;
            if (isConfirmed) {
                showConfetti = true;
            }
        } catch (error) {
            console.error('Failed to fetch confirmation status:', error);
        }
    });
    
    function moveNoButton() {
        if (!containerRef) return;
        
        const containerRect = containerRef.getBoundingClientRect();
        const buttonWidth = 150;  
        const buttonHeight = 60;  
        
        const maxX = containerRect.width - buttonWidth;
        const maxY = containerRect.height - buttonHeight;
        
        noButtonPosition = {
            x: Math.floor(Math.random() * maxX),
            y: Math.floor(Math.random() * maxY)
        };
    }
    
    async function onYes() {
        showConfetti = true;
        isConfirmed = true;
        
        try {
            await fetch('/api/confirmation', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Failed to update confirmation:', error);
        }
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
        {#each Array(20) as _, i}
            <div 
                class="absolute heart-float"
                style="
                    left: {Math.random() * 100}%;
                    top: {Math.random() * 100}%;
                    animation-delay: {Math.random() * 5}s;
                    opacity: 0.{Math.floor(Math.random() * 3) + 1};
                    font-size: {Math.floor(Math.random() * 20) + 10}px;
                "
            >
                ❤️
            </div>
        {/each}
    </div>

    {#if showConfetti}
        <div class="fixed inset-0 pointer-events-none flex justify-center">
            <Confetti x={[-5, 5]} y={[0, 0.1]} delay={[500, 2000]} infinite duration={5000} amount={200} fallDistance="100vh" xSpread={0.4} /> 
        </div>
    {/if}

    {#if isConfirmed}
        <div class="text-center animate-fade-in">
            <h1 class="text-6xl font-bold text-pink-600 mb-6 drop-shadow-lg">¡Te amo!</h1>
            <p class="text-3xl text-pink-500 italic mb-8">Muchas gracias por todo princesa</p>
            <div class="w-[600px] h-[450px] bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-2xl p-4">
                <img 
                    src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjlpN2E0MWVsNzdpNTA3c2g3eGowYmJheHVmNnVrcmVyNGJqNXJqeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YGIpIZjgxL68w/giphy.gif"
                    alt="Love Celebration"
                    class="w-full h-full object-contain"
                />
            </div>
        </div>
    {:else}
        <div class="text-center mb-12 animate-fade-in">
            <h1 class="text-6xl font-bold text-pink-600 mb-6 drop-shadow-lg">¿Quieres ser mi Valentine? 💝</h1>
            <p class="text-xl text-pink-500 italic">¿Me harías el honor?</p>
        </div>
        
        <div 
            bind:this={containerRef}
            class="relative w-[600px] h-[400px]"
        >
            <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8">
                <button
                    onmouseenter={moveNoButton}
                    class="px-8 py-4 bg-gray-500 text-white rounded-lg text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl"
                    style="transform: translate({noButtonPosition.x}px, {noButtonPosition.y}px);"
                >
                    No 💔
                </button>
                
                <button
                    onclick={onYes}
                    class="px-12 py-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl text-2xl font-bold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:from-pink-600 hover:to-rose-600 z-10 animate-pulse"
                >
                    ¡Sí! 💖
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
    :global(body) {
        overflow: hidden;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(10deg);
        }
    }

    .heart-float {
        animation: float 6s ease-in-out infinite;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-in {
        animation: fadeIn 1s ease-out;
    }
</style>