<script lang="ts">
    export let message: string = ''
    export let type: string = 'info'
</script>

{#if message}
    <div class="alert alert-{type}" role="alert">{message}</div>
{/if}
