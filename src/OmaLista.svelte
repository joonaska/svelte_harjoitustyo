<script>
  // käytetään modalia näyttämään omalista
  import Modal from './Modal.svelte';
  // oma lista importataan storesta
  import omalista from './omaVitsiListaStore';
  // vähän liikettä listaan
  import { scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  // taas dispatcheri
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  // takaisin nappiin on:clikki
  const peruuta = () => dispatch('peruuta');
  // poistetaan klikkaamalla haluttu suosikki
  const poista = (id) => {
    omalista.update((omalista) => omalista.filter((a) => a.id != id));
  };
</script>

<Modal>
  <div class="kokolista">
    <header>
      <h1>Omat suosikit:</h1>
      {#if $omalista.length >= 1}
        <p>poista klikkaamalla haluamasi</p>
      {/if}
    </header>

    <div class="omatvitsit">
      <!-- jos listassa on tietoa tehdään divit, muutoin tulee viesti ei
      suosikkeja--->
      {#if $omalista.length > 0}
        {#each $omalista as oma (oma.id)}
          <div
            class="suosikki"
            transition:scale
            animate:flip
            on:click={() => poista(oma.id)}
          >
            {oma.vitsi}
          </div>
        {/each}
      {:else}
        <p>Ei vielä suosikkeja</p>
      {/if}
    </div>

    <div>
      <slot name="footer" />

      <button on:click={peruuta}>Takaisin</button>
    </div>
  </div>
</Modal>

<style>
  button {
    color: black;
    background-color: white;
    border: black solid 2px;
    border-radius: 5px;
    padding: 0.5em;
    font-size: medium;
  }
  button:hover {
    background-color: black;
    color: white;
  }
  .kokolista {
    background: linear-gradient(
      to right,
      #0e0604 0%,
      #25a428 50%,
      #11c521 100%
    );
  }
  .suosikki {
    border: #0e0604 solid 1px;
    border-radius: 20px;
    background: linear-gradient(
      to bottom,
      #373535 0%,
      #e4e4df 26%,
      #f9fff1 100%
    );
    margin-bottom: 1em;
    padding: 2em;
    box-shadow: 5px 5px 15px 4px #000000;
  }
</style>
