<script>
    import { onMount } from 'svelte';
    
    export let size = 24;
    export let color = '#ff4b6e';
    
    let scale = 1;
    let mounted = false;
    
    onMount(() => {
        mounted = true;
        return () => {
            mounted = false;
        };
    });
</script>

<style>
    .heart {
        transform-origin: center;
        transition: transform 0.3s ease-in-out;
    }
    
    .heart-path {
        fill: currentColor;
    }
    
    .beating {
        animation: heartbeat 1.5s ease-in-out infinite;
    }
    
    @keyframes heartbeat {
        0% {
            transform: scale(1);
        }
        14% {
            transform: scale(1.1);
        }
        28% {
            transform: scale(1);
        }
        42% {
            transform: scale(1.1);
        }
        70% {
            transform: scale(1);
        }
    }
</style>

<svg
    class="heart beating"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    style="color: {color};"
>
    <path
        class="heart-path"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    />
</svg>