<script lang="ts">
    import type { Alert as AlertType } from '../types'
    import { cactuses } from '../store'
    import CactusItem from './CactusItem.svelte'
    import Alert from './Alert.svelte'
    import Filters from './Filters.svelte'

    $: filteredCactuses = $cactuses

    let alert: AlertType = {
        show: false,
        message: '',
        type: '',
    }

    const handleDeleteError = (e: CustomEvent): void => {
        alert = e.detail
    }

    const replaceFilteredValues = (e: CustomEvent): void => {
        filteredCactuses = e.detail
    }
</script>

{#if alert.show}
    <Alert message={alert.message} type={alert.type} />
{/if}

<Filters cactuses={$cactuses} on:filteredValues={replaceFilteredValues} />

{#each filteredCactuses as cactus}
    <CactusItem {cactus} on:deleteError={handleDeleteError} />
{/each}
