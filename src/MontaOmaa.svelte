<script>
  // kokeillaan tiedon tuhoamista, ylivuodon estämiseksi....
  import { onDestroy } from 'svelte';

  import omalista from './omaVitsiListaStore';

  let montaOmaa;
  // tilataan listasta tietoa ja poistetaan sitten kun ei enää relevanttia
  const unsub = omalista.subscribe((a) => {
    if (a.length > 0) {
      montaOmaa = $omalista.length;
    }
  });

  onDestroy(() => {
    if (unsub) {
      unsub();
    }
  });
</script>

<p>Sinulla on ({montaOmaa}) suosikkia!</p>

<style>
  p {
    font-size: small;
    font-weight: lighter;
  }
</style>
