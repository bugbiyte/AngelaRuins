const hamburger = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

const musicToggle = document.getElementById('music-toggle');
const musicPlayer = document.getElementById('music-player');
const musicLabel  = document.getElementById('music-label');

if (musicToggle && musicPlayer) {
  if (!window.Mixcloud) {
    console.warn('Mixcloud widget API failed to load; music disabled.');
  } else {
    const widget = Mixcloud.PlayerWidget(musicPlayer);
    let ready = false;
    let wantPlay = false;

    const setPlaying = playing => {
      musicToggle.classList.toggle('playing', playing);
      musicToggle.setAttribute('aria-pressed', playing);
      musicToggle.setAttribute('aria-label', playing ? 'Pause music' : 'Play music');
      musicLabel.textContent = playing ? 'Pause music' : 'Play music';
    };

    widget.ready.then(() => {
      ready = true;
      widget.events.play.on(() => setPlaying(true));
      widget.events.pause.on(() => setPlaying(false));
      widget.events.ended.on(() => setPlaying(false));
      widget.events.error.on(e => console.warn('Mixcloud error', e));
      if (wantPlay) widget.play();
    });

    musicToggle.addEventListener('click', () => {
      musicToggle.classList.remove('attention');
      if (!ready) {
        wantPlay = true;
        return;
      }
      widget.togglePlay();
    });
  }
}
