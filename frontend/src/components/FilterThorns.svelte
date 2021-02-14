<script lang="ts">
    import type { CactusItem } from '../types'
    import { createEventDispatcher } from 'svelte'

    export let cactuses: Array<CactusItem>

    const dispatch = createEventDispatcher()
    let minValue: string = ''
    let maxValue: string = ''

    const handleNumberFilter = (): void => {
        const min: number = parseInt(minValue) || 0
        const max: number = parseInt(maxValue) || -1

        const filteredValues: Array<CactusItem> = cactuses.filter(
            (item: CactusItem) => {
                const thorns: number = item.thornsNumber

                if (max === -1) {
                    return thorns >= min
                }

                return thorns >= min && thorns <= max
            }
        )

        dispatch('filterThorns', filteredValues)
    }
</script>

<div class="mb-3">
    <div class="row">
        <div class="col-6">
            <label for="thornsMin" class="form-label">Filter thorns min.</label>
            <input
                type="number"
                id="thornsMin"
                min="0"
                class="form-control"
                bind:value={minValue}
                on:input={handleNumberFilter} />
        </div>

        <div class="col-6">
            <label for="thornsMax" class="form-label">Filter thorns max.</label>
            <input
                type="number"
                id="thornsMax"
                class="form-control"
                bind:value={maxValue}
                on:input={handleNumberFilter} />
        </div>
    </div>
</div>
