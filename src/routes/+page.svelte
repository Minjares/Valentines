<script lang="ts">
    import Heart from '$lib/components/Heart.svelte';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    interface Word {
        id: number;
        word: string;
        hint: string;
    }

    let words: Word[] = [];
    let userInput: string = '';
    let message: string = '';
    let isLoading: boolean = true;
    let targetWord: string = '';
    let completedWords: boolean[] = [];
    let visibleHints: boolean[] = [];

    let hearts = Array(25).fill(null).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 2,
        duration: Math.random() * 2 + 3
    }));

    onMount(async () => {
        try {
            const response = await fetch('/api/words');
            words = await response.json();
            targetWord = words.map(w => w.word.toLowerCase()).join('');
            completedWords = new Array(words.length).fill(false);
            visibleHints = new Array(words.length).fill(false);
            visibleHints[0] = true;
        } catch (error) {
            message = 'Failed to load words';
        } finally {
            isLoading = false;
        }
    });
    
    function handleSubmit(): void {
        checkInput(userInput);
    }

    function checkInput(input: string) {
        let currentPosition = 0;
        input = input.toLowerCase();
        
        if (!input) {
            completedWords = new Array(words.length).fill(false);
            visibleHints = new Array(words.length).fill(false);
            visibleHints[0] = true;
            return;
        }

        for (let i = 0; i < words.length; i++) {
            const word = words[i].word.toLowerCase();
            
            if (input.slice(currentPosition, currentPosition + word.length) === word) {
                completedWords[i] = true;
                if (i + 1 < words.length) {
                    visibleHints[i + 1] = true;
                }
                currentPosition += word.length;
            }
        }

        // Check if all words are completed
        if (completedWords.every(completed => completed)) {
            message = '¡Correcto! ❤️';
            try {
                fetch('/api/token', {
                    method: 'PUT',
                });
                setTimeout(() => {
                    goto('/timeline');
                }, 1500);
            } catch (error) {
                console.error('Failed to create token:', error);
            }
        } else {
            message = 'Intenta de nuevo...';
        }
    }

    $: {
        checkInput(userInput);
    }

    $: messageClass = message.includes('Correcto') ? 'text-green-600' : 'text-red-600';
</script>

<style>
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(-20px) rotate(10deg);
        }
    }

    .floating-heart {
        position: fixed;
        pointer-events: none;
    }
</style>

{#if isLoading}
    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-red-50">
        <div class="text-xl font-semibold text-pink-600">Loading...</div>
    </div>
{:else}
    <!-- Floating Hearts -->
    {#each hearts as heart}
        <div 
            class="floating-heart"
            style="
                left: {heart.x}vw;
                top: {heart.y}vh;
                animation: float {heart.duration}s ease-in-out infinite alternate;
                animation-delay: {heart.delay}s;
            "
        >
            <Heart size={heart.size} color="#ff4b6e" />
        </div>
    {/each}

    <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-red-50">
        <div class="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl w-full mx-4 border border-pink-200">
            <div class="relative mb-8">
                <h2 class="text-3xl font-bold text-center text-pink-600 mb-2">
                    ❤️ Secret Valentine ❤️
                </h2>
                <p class="text-pink-400 text-center text-sm italic">
                    Usa las pistas para descubrir la frase
                </p>
                <div class="absolute -top-4 -left-4 w-8 h-8 text-pink-400 opacity-50">❤️</div>
                <div class="absolute -bottom-4 -right-4 w-8 h-8 text-pink-400 opacity-50">❤️</div>
            </div>
            
            <div class="space-y-4 bg-pink-50/50 p-6 rounded-xl mb-6">
                {#each words as word, i}
                    {#if visibleHints[i]}
                        <div class="flex items-center gap-3 justify-center transform hover:scale-102 transition-transform">
                            {#if completedWords[i]}
                                <span class="text-pink-500 text-xl">❤️</span>
                            {/if}
                            <p class="text-gray-700 italic bg-white/80 px-4 py-2 rounded-full shadow-sm border border-pink-100">
                                {word.hint}
                            </p>
                        </div>
                    {/if}
                {/each}
            </div>
            
            <form 
                on:submit|preventDefault={handleSubmit}
                class="space-y-4"
            >
                <div class="relative">
                    <input
                        type="password"
                        bind:value={userInput}
                        placeholder="Escribe la frase secreta..."
                        autocomplete="off"
                        class="w-full px-6 py-3 border-2 border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent bg-white/80 placeholder-pink-300"
                    />
                    <div class="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-300">❤️</div>
                </div>
                
                <button 
                    type="submit"
                    class="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                    Siguiente ❤️
                </button>
            </form>
            
            {#if message}
                <p class="mt-6 font-semibold text-center {messageClass} animate-pulse">
                    {message}
                </p>
            {/if}
        </div>
    </div>
{/if}
