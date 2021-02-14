<script lang="ts">
    import type { Alert as AlertType, CactusItem } from '../types'
    import { redirect } from '@roxi/routify'
    import { cactuses } from '../store'
    import CactusForm from '../components/CactusForm.svelte'
    import Alert from '../components/Alert.svelte'

    let alert: AlertType = {
        show: false,
        message: '',
        type: '',
    }

    const submitNewCactus = async (e: CustomEvent): Promise<void> => {
        const cactus: CactusItem = e.detail

        try {
            const response = await fetch(process.env.CACTUS_BACKEND_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cactus),
            })

            const data = await response.json()

            if (!response.ok) {
                throw data.message
            }

            $cactuses = [...$cactuses, data]

            $redirect('/')
        } catch (error) {
            const err: AlertType = {
                show: true,
                message: error,
                type: 'danger',
            }

            alert = err
        }
    }
</script>

<svelte:head>
    <title>Create new cactus</title>
</svelte:head>

<main>
    <div class="container">
        <h1>Create a new cactus</h1>

        {#if alert.show}
            <Alert message={alert.message} type={alert.type} />
        {/if}

        <CactusForm button="Create cactus" on:formSubmit={submitNewCactus} />
    </div>
</main>
