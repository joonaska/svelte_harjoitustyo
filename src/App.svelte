<script>
  // juuresta otsikko
  export let title;
  // tarvittavia komponentteja
  import Navi from './Navi.svelte';
  import Button from './Button.svelte';

  import Login from './Login.svelte';

  import MontaOmaa from './MontaOmaa.svelte';

  import OmaLista from './OmaLista.svelte';
  // oma vitsi store minne voi säilyttää parhaat
  import omalista from './omaVitsiListaStore';
  // login "tietokanta"
  const logIn = {
    kayttaja: 'Testi',
    passu: 'Test1',
  };

  // oikeuksia apin käyttöön.
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-RapidAPI-Host': 'matchilling-chuck-norris-jokes-v1.p.rapidapi.com',
      'X-RapidAPI-Key': '750527ad8amsh581b9e0695f095dp1d335fjsne11992c25995',
    },
  };
  // pieni loadaus ilmoitus kunnes haku on valmis
  let randomJoke = 'Loading...';
  // haetaan random vitsi funktio
  const getJokes = async () => {
    const response = await fetch(
      'https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random',
      options
    );
    if (!response.ok) {
      throw new Error('Chuck Norris iski haettaessa vitsiä!');
    }
    return await response.json();
  };

  // toistetaan hakua ja parsitaan tuloksesta vitsi eli value
  const uudestaan = () => {
    {
      getJokes()
        .then((data) => {
          randomJoke = data.value;
        })

        .catch((err) => console.error(err));
    }
  };
  // eka vitsi
  uudestaan();

  // !!! käytettyjä funktioita !!!

  let naytaTallenna = true;
  // tallentaa objektin storeen, lisää id:n ja vitsin
  const tallenna = () => {
    const uusi = {
      // juokseva id
      id: Math.max(0, ...$omalista.map((t) => t.id)) + 1,
      vitsi: randomJoke,
    };

    // päivitetään storen listaa, vanhat jää uusi lisätty
    omalista.update((a) => [...a, uusi]);
    console.log(uusi);
    naytaTallenna = false;
    // pikku ajastin, että vilauttaa ruudulla tallennettu suosikkeihin, jonka jälkeen tallenna nappi palaa
    setTimeout(() => {
      naytaTallenna = true;
    }, 1000);
  };

  let loginRuutu = false;
  const loggaus = () => {
    if (loginRuutu) {
      loginRuutu = false;
    } else {
      loginRuutu = true;
    }
  };

  const loggausOut = () => {
    logInOk = false;
  };
  // kirjautuminen tarkistaa tiedot yllä olevasta "tietokannasta" ja jos matchaa ni päästää sisälle, purkkaa purkkaa
  const kirjaudu = (ce) => {
    if (
      ce.detail.kayttaja === logIn.kayttaja &&
      ce.detail.passu === logIn.passu
    ) {
      logInOk = true;
      loggaus();
    } else {
      logInOk = false;
      // pakollinen ärsyke eli alertti....
      alert('Väärät tiedot!');
      loggaus();
    }
  };
  let logInOk = false;

  // oman listan näyttö
  let omalistaShow = false;
  const naytaOmat = () => {
    if (omalistaShow) {
      omalistaShow = false;
    } else {
      omalistaShow = true;
    }
  };
</script>

<header>
  <!-- title tulee juuresta-->
  <h1>{title}!</h1>
</header>
<main>
  <div>
    <!-- navi muuttuu, riippuen onko kirjauduttu sisälle.-->
    {#if !logInOk}
      <Navi on:nayta={naytaOmat} on:login={loggaus} logged={'Kirjaudu'} />
    {:else}
      <Navi
        on:nayta={naytaOmat}
        on:logout={loggausOut}
        logged={'Kirjaudu ulos'}
        suosikit={'Omat suosikit'}
      />
    {/if}
  </div>
  <hr color="black" />

  <!-- login ruuttu pompsahtaa kun klikkaa kirjaudu, arvo muuttuu trueksi, joka aiemmin on määritelty falseksi-->
  {#if loginRuutu}
    <Login on:cancel={loggaus} on:login={kirjaudu} />
  {/if}

  <div class="container">
    <div class="randomvitsi">
      <p class="vitsi">
        {randomJoke}
      </p>
      {#if naytaTallenna}
        <button class="saveButton" on:click={tallenna}>Tallenna</button>
      {:else if !naytaTallenna}
        <p>Tallennettu suosikkeihin!<MontaOmaa /></p>
      {/if}
    </div>
    <div class="nappula">
      <Button on:click={uudestaan}>Shuffle!</Button>
    </div>
  </div>
  <!-- jos loggaus on ok ja omalistashow true näytetään omat suosikit-->
  {#if logInOk && omalistaShow}
    <OmaLista {randomJoke} on:peruuta={naytaOmat} />
  {/if}
</main>

<style>
  .randomvitsi {
    border: solid 1px black;
    margin: 1em 5em 1em 5em;
    box-shadow: -3px 6px 19px -2px rgba(0, 0, 0, 0.59);
  }
  .vitsi {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    font-size: 28px;
    letter-spacing: 0.4px;
    word-spacing: 1.2px;
    color: #000000;
    font-weight: 700;
    text-decoration: none;
    font-style: italic;
    font-variant: normal;
    text-transform: none;
  }
  .nappula {
    margin-top: 10vh;
    margin-bottom: 10vh;
  }
  .saveButton {
    color: black;
    background-color: white;
    border: black solid 2px;
    border-radius: 5px;
    padding: 0.5em;
    font-size: medium;
  }
  .saveButton:hover {
    background-color: black;
    color: white;
  }
  header {
    text-align: center;
  }
  main {
    border: black solid 1px;
    text-align: center;
    padding: 2em;
    max-width: 240px;
    margin: 0em 2em 0em 2em;
    height: auto;
  }

  h1 {
    color: black;
    font-family: fantasy;
    font-size: 5em;

    font-weight: lighter;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
