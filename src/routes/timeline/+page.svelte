<script lang="ts">
    import { Button } from 'flowbite-svelte';
    import { ArrowRightOutline } from 'flowbite-svelte-icons';
    import Heart from '$lib/components/Heart.svelte';
    import { goto } from '$app/navigation';

    const events = Array.from({ length: 42 }, (_, i) => ({
        id: 42 - i,
        imageUrl: `/Fotos/${42 - i}.webp`,
        title: `Memory #${42 - i}`, 
        description: 'A beautiful moment together' 
    }));

    function goToMaze() {
        goto('/maze');
    }
</script>

<div class="min-h-screen bg-gradient-to-br from-pink-100 to-red-50 py-12 px-4 relative overflow-hidden">
    {#each Array(20) as _, i}
        <div 
            class="absolute animate-float"
            style="
                top: {Math.random() * 100}vh;
                left: {Math.random() * 100}vw;
                animation-delay: {Math.random() * 5}s;
                animation-duration: {5 + Math.random() * 5}s;
            "
        >
            <Heart size={16 + Math.random() * 16} color="#ff69b4" />
        </div>
    {/each}

    <div class="max-w-6xl mx-auto relative">
        <div class="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <Heart size={64} color="#ff1493" />
        </div>
        
        <h1 class="text-5xl font-bold text-center text-pink-600 mb-16 font-cursive">
            Tiempo Juntos 
            <span class="inline-block animate-bounce">❤️</span>
        </h1>
        
        <div class="relative">
            <div class="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-gradient-to-b from-pink-300 via-red-400 to-pink-300"></div>

            <div class="relative">
                {#each events as event, i}
                    <div class={"relative mb-16 group " + (i % 2 === 0 ? "pr-16 md:pr-20 md:ml-0 md:w-1/2" : "md:ml-[50%] pl-16 md:pl-20 md:w-1/2")}>
                        <div class={"absolute transform -translate-y-1/2 top-1/2 z-10 transition-transform duration-300 group-hover:scale-125 " + (i % 2 === 0 ? "-right-6 md:-right-6" : "-left-6 md:-left-6")}>
                            <Heart size={48} color="#ff1493" />
                        </div>

                        <div class="bg-white/90 backdrop-blur-sm rounded-xl p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 border-pink-200">
                            <div class="h-96 w-96 mx-auto relative overflow-hidden rounded-lg shadow-inner">
                                <img 
                                    src={event.imageUrl} 
                                    alt={event.title}
                                    class="absolute h-96 w-96 object-cover transform rotate-90 origin-center transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                        </div>
                    </div>
                {/each}

                <div class="flex justify-center mt-16 mb-8">
                    <Button
                        size="xl"
                        class="font-bold text-xl px-8 py-4 !bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        on:click={goToMaze}
                    >
                        Continuar
                        <ArrowRightOutline class="ml-2 w-6 h-6" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }

    .animate-float {
        animation: float linear infinite;
    }

    .font-cursive {
        font-family: 'Brush Script MT', cursive;
    }
</style>