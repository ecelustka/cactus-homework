<script lang="ts">
    import type { Alert, CactusItem } from '../types'
    import { createEventDispatcher } from 'svelte'
    import { cactuses } from '../store'

    export let id: string = ''

    const dispatch = createEventDispatcher()

    const deleteCactus = async () => {
        try {
            const response = await fetch(process.env.CACTUS_BACKEND_URL, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw data.message
            }

            $cactuses = $cactuses.filter(
                (item: CactusItem) => item.id !== data.id
            )
        } catch (error) {
            const err: Alert = {
                show: true,
                message: error,
                type: 'danger',
            }

            dispatch('deleteError', err)
        }
    }
</script>

<button
    type="button"
    class="btn btn-danger delete-button"
    on:click={deleteCactus}>
    <slot />
</button>

<style>
    .delete-button {
        padding: 0.5rem;
    }

    .delete-button :global(svg) {
        display: block;
    }

    @media (min-width: 576px) {
        .delete-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 1rem;
        }
    }
</style>
