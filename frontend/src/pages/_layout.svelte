<script lang="ts">
    import type { Alert as AlertType } from '../types'
    import { cactuses } from '../store'
    import Alert from '../components/Alert.svelte'

    const getData = async (): Promise<void | string> => {
        try {
            const response: Response = await fetch(
                process.env.CACTUS_BACKEND_URL
            )

            const data = await response.json()

            if (!response.ok) {
                throw data.message
            }

            $cactuses = data
        } catch (error) {
            const err: AlertType = {
                show: true,
                message: error,
                type: 'danger',
            }

            throw err
        }
    }
</script>

<div class="py-3 py-md-5">
    {#await getData()}
        <div
            class="vh-100 w-100 d-flex align-items-center justify-content-center">
            <img src="/images/layout-spinner.svg" alt="" role="presentation" />
        </div>
    {:then}
        <slot />
    {:catch alert}
        <div class="container">
            {#if alert.show}
                <Alert message={alert.message} type={alert.type} />
            {/if}
        </div>
    {/await}
</div>
