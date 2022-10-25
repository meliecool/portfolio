document.addEventListener('DOMContentLoaded', start, false);

function start() {
  let compteur = 1;
  let meteorInterval = setInterval(createMeteor, 1500);
  let paused = false;

  setInterval(() => {
    document.getElementById('direction').style.display = 'none';
  }, 5000);

  setInterval(positionVerification, 10);

  document.getElementById('replay').click(() => {
    location.reload();
  });

  if (document.getElementById('game').length > 0) {
    play = true;
    position = 0;
    positionY = 0;
    let persoY = parseInt(
      document.getElementById('spaceship').style.top.replace('px', ''),
    );

    document.keydown(function (e) {
      keys = [e.keyCode];
      keys[e.keyCode] = true;

      if (!paused) {
        if (keys[38] && keys[32]) {
          moveUp();
          fireAnimation();
        } else if (keys[38]) {
          moveUp();
        }

        if (keys[40] && keys[32]) {
          moveDown();
          fireAnimation();
        } else if (keys[40]) {
          moveDown();
        }

        if (keys[32]) {
          fireAnimation();
        }
      }

      if (keys[27]) {
        pause();
      }
    });

    function moveDown() {
      if (persoY <= 680) {
        persoY += 20;
        bulletY = persoY + 75;

        document.getElementById('spaceship').style.top = `${persoY}px`;
      }

      if (persoY >= 410) {
        document.getElementById('direction').style.opacity = 0;
      }

      if (persoY < 410) {
        document.getElementById('direction').style.opacity = 1;
      }
    }

    function moveUp() {
      if (persoY >= 30) {
        persoY = persoY - 20;
        bulletY = persoY + 75;
        document.getElementById('spaceship').style.top = `${persoY}px`;
      }

      if (persoY < 410) {
        document.getElementById('direction').style.opacity = 1;
      }
    }
  }

  function createMeteor() {
    const meteorImg = document.createElement('img').src = 'img/meteor.svg';
    const newMeteor = document.createElement('div').classList.add(['meteor-right', 'absolute', 'meteor']).setAttribute(id, `meteor-container${compteur}`).innerHTML = meteorImg;
    document
      .getElementById('start-meteor')
      .append(
        newMeteor
      );

    const meteors = document.getElementsByClassName('.meteor')
    if (!!meteors.length) {
      meteors.forEach((meteor) => {
        meteorFall(meteor);
      });
    }

    if (compteur == 20) {
      clearInterval(meteorInterval);
    }

    compteur++;
  }

  function meteorFall(meteor) {
    let y = Math.random() * 85;

    meteor.animate(
      {
        left: ['1920px', '0'],
        top: y + '%',
      },
      { duration: 3500, easing: 'linear', iterations: 1 },
    );

    let position = meteor.style.left;
    let life = document.getElementById('life').html();

    if (position === '0px') {
      meteor.remove();

      if (life > 0) {
        life = life - 1;
        document.getElementById('life').html(life);
      }
    }

    if (life === 0) {
      document.getElementById('game-over').style.display = 'flex';
      document.getElementById('game').style.display = 'none';
      clearInterval(meteorInterval);
    }
  }

  function fireAnimation() {
    let fire = document.getElementById('fire');

    let bullet = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bullet.classList.add('fire-animation');
    bullet.style.width = '11px';
    bullet.style.height = '4px';
    bullet.setAttribute('style', 'fill:white');

    document.getElementById('game').appendChild(fire);
    document.getElementById('fire').appendChild(bullet);

    document.getElementsByClassName('.fire-animation').forEach((fire) => {
      let x = 100;
      let persoY = parseInt(
        document.getElementById('spaceship').style.top.replace('px', ''),
      );
      let y = persoY + 75;

      if (typeof fire.getAttribute('data') === 'undefined') {
        fire.setAttribute('y', `${y}px`);
      }

      fire.animate(
        {
          x: ['155px', `${x}%`],
        },
        { duration: 1000, easing: 'linear', iterations: 1 },
      );

      fire.remove();
    });
  }

  function positionVerification() {
    let positionBulletX;
    let positionBulletY;
    let meteorW;
    let meteorH;
    let meteorX;
    let meteorY;

    const bullets = document.getElementsByClassName('.fire-animation')

    if (!!bullets.length) {
      bullets.forEach((fire) => {
        bulletW = fire.width();
        positionBulletX = Math.round(fire.offset().left) + bulletW;
        positionBulletY = Math.round(fire.offset().top);

        document.getElementsByClassName('.meteor').forEach((meteor) => {
          meteorW = meteor.width();
          meteorH = meteor.height();
          meteorX = Math.round(meteor.offset().left);
          meteorY = Math.round(meteor.offset().top);

          if (
            positionBulletX >= meteorX &&
            positionBulletX <= meteorX + meteorW &&
            positionBulletY >= meteorY &&
            positionBulletY <= meteorY + meteorH
          ) {
            meteor.stop().remove();

            let score = parseInt(document.getElementById('score').html());

            score = score + 100;
            document.getElementById('score').html(score);
          }
        });
      });
    }

    if (
      compteur == 21 &&
      typeof document.getElementById('meteor-container20').offset() ==
        'undefined'
    ) {
      clearInterval(meteorInterval);
      document.getElementById('finish-game').style.display = 'flex';
      document.getElementById('game').style.display = 'none';
    }
  }

  function pause() {
    paused = !paused;

    // if (paused) {
    //   clearInterval(meteorInterval);
    //   $('.meteor').forEach(() => {
    //     $(this).stop();
    //   });
    // } else {
    //   $('.meteor').forEach((idx, meteor) => {
    //     meteorFall(meteor)
    //   })

    //   meteorInterval = setInterval(meteorFall, 1500);
    // }
  }
}

// Entirely created and realised by Camélie Groleau //
