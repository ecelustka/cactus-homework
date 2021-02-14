<script lang="ts">
    import type { CactusItem } from '../types'
    import { url } from '@roxi/routify'
    import DeleteCactusButton from '../components/DeleteCactusButton.svelte'

    export let cactus: CactusItem
</script>

<div class="cactus-item">
    {#if cactus.name}
        <h2>{cactus.name}</h2>
    {/if}

    {#if cactus.latinName}
        <div class="cactus-property">latin name: {cactus.latinName}</div>
    {/if}

    {#if cactus.flowerpotSize}
        <div class="cactus-property">flowerpot: {cactus.flowerpotSize}</div>
    {/if}

    {#if cactus.thornsNumber}
        <div class="cactus-property">thorns: {cactus.thornsNumber}</div>
    {/if}

    <a class="btn btn-primary edit-button" href={$url(`/${cactus.id}/`)}>
        <span class="visually-hidden">Edit cactus</span>
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="18"
            height="18"
            ><path d="M0 0h24v24H0z" fill="none" /><path
                d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
    </a>

    <DeleteCactusButton id={cactus.id} on:deleteError>
        <span class="visually-hidden">Remove cactus</span>
        <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            width="18"
            height="18"
            ><path d="M0 0h24v24H0z" fill="none" /><path
                d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" /></svg>
    </DeleteCactusButton>
</div>

<style>
    .cactus-item {
        position: relative;
        padding: 1rem;
        background-color: var(--bs-light);
    }

    .cactus-item:not(:last-child) {
        margin-bottom: 1rem;
    }

    .cactus-property {
        margin-bottom: 0.5rem;
    }

    .edit-button {
        padding: 0.5rem;
        margin-right: 0.5rem;
    }

    .edit-button svg {
        display: block;
    }

    @media (min-width: 576px) {
        .cactus-property:last-of-type {
            margin-bottom: 0;
        }

        .edit-button {
            margin-right: 0rem;
            position: absolute;
            right: 4.25rem;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
