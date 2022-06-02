<script>
  // importoidaan tarvittavia komponentteja
  import Textinput from './Textinput.svelte';
  import Modal from './Modal.svelte';

  // transitionia ja easingia svelteltä
  import { fly, blur } from 'svelte/transition';
  import { expoIn } from 'svelte/easing';

  let disabled = false;
  // importoidaan eventdispatcher jolla saadaan välitettyä eventtejä eteenpäin äiteelle
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  // peruutus
  const cancel = () => dispatch('cancel');
  // sisään kirjautuminen, välittää syötetyt tiedot objektina, verrataan sitten app.sveltessä "tietokantaan"
  const login = () =>
    dispatch('login', {
      kayttaja: kayttajatunnus,
      passu: salasana,
    });
  let kayttajatunnus = '';
  let salasana = '';
  // validoidaan syötettä
  function onkovalidiSyote(teksti) {
    // syötteen pitää olla vähintään viisi merkkiä
    return teksti.trim().length >= 5;
  }

  // reaktiivinen deklaraatio haistelee syötettä
  $: validiKayttajaTunnus = onkovalidiSyote(kayttajatunnus);
  $: validiSalasana = onkovalidiSyote(salasana);

  $: validiKirjautuminen = validiKayttajaTunnus && validiSalasana;
</script>

<!-- Modal käytössä, jolloin kirjautuminen ns. pompsahtaa esiin.-->
<Modal>
  <div
    class="kokologin"
    in:fly={{ y: -50, duration: 400, easing: expoIn }}
    out:blur
  >
    <header>
      <slot name="header" />
      <h3>Kirjaudu sisään</h3>
    </header>
    <Textinput
      type="text"
      label="Käyttäjätunnus"
      bind:value={kayttajatunnus}
      id="kayttajatunnus"
      on:input={(e) => (salasana = e.target.value)}
      valid={validiKayttajaTunnus}
      errmsg="Käyttäjätunnus on pakollinen"
    />
    <Textinput
      type="password"
      label="Salasana"
      bind:value={salasana}
      id="salasana"
      on:input={(e) => (salasana = e.target.value)}
      valid={validiSalasana}
      errmsg="Salasana on pakollinen"
    />
    <div>
      <slot name="footer" />
      <!-- pieni inffo, häviää kun korrekti määrä merkkejä joka paikassa.-->
      {#if !validiKirjautuminen}
        <p class="infoteksti">
          Täytäthän kaikki kentät! molemmissa tulee olla vähintään 5 merkkiä
        </p>
      {/if}
      <button on:click={login} disabled={!validiKirjautuminen}>OK</button>
      <button on:click={cancel}>Peruuta</button>
    </div>
  </div>
</Modal>

<style>
  button {
    width: 30%;
    background-color: rgb(31, 30, 30);
    color: white;
  }
  .kokologin {
    background: linear-gradient(
      to right,
      #0e0604 0%,
      #25a428 50%,
      #11c521 100%
    );
  }
  .infoteksti {
    color: white;
  }
  button:disabled {
    background-color: rgb(71, 71, 71);
    color: red;
  }
</style>
