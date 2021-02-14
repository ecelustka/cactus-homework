<script lang="ts">
    import type { CactusItem } from '../types'
    import { createEventDispatcher } from 'svelte'

    import FilterName from './FilterName.svelte'
    import FilterFlowerpot from './FilterFlowerpot.svelte'
    import FilterThorns from './FilterThorns.svelte'

    export let cactuses: Array<CactusItem>

    const dispatch = createEventDispatcher()

    const dispatchFilteredValues = (e: CustomEvent): void => {
        dispatch('filteredValues', e.detail)
    }
</script>

<div class="row">
    <div class="col-lg-4">
        <FilterName {cactuses} on:filterName={dispatchFilteredValues} />
    </div>
    <div class="col-lg-4">
        <FilterFlowerpot
            {cactuses}
            on:filterFlowerpot={dispatchFilteredValues} />
    </div>
    <div class="col-lg-4">
        <FilterThorns {cactuses} on:filterThorns={dispatchFilteredValues} />
    </div>
</div>
