$(document).ready(function () {

    // VARIABLES GLOBALES //
    let compteur = 1;
    let meteorInterval = null;


    // APPELS //

    /* Appel des météorites */
    meteorInterval = setInterval(meteorFall, 1500);

    /* Appel de l'animation sur l'accueil */
    setInterval(animPois(), 3000);

    /* Appel de la disparition des directions */
    setInterval(function () {
        $("#direction").css({ "display": "none" });
    }, 5000);

    /* Appel la vérification des positions */
    setInterval(verifXY, 10);


    // RELOAD LA PAGE SI L'ON CLIQUE SUR LE BOUTON REJOUER //
    $("#replay").click(function () {
        location.reload();
    });


    // PAGE DE PROFIL //

    /* Fonction qui active les animations */
    $('#couette').addClass("animCouette1");
    $('#oeil_gauche').addClass("clignementOeil");
    $('#oeil_droit').addClass("clignementOeil");
    $('#oeil_gauche2').addClass("clignementOeil2");
    $('#oeil_droit2').addClass("clignementOeil2");
    $('#pupille_gauche').addClass("tourneOeil");
    $('#pupille_droite').addClass("tourneOeil");
    $('#bouche').addClass("animBouche");
    $('#bras').addClass("animBras");
    $('#bras_pointe').addClass("animBrasPointe");
    $('#text_bulle').addClass("animBulleText");
    $('#text').addClass("animText");


    /* Fonction qui active l'écriture automatique */
    if ($('#section2').length > 0) {
        var typed = new Typed('#typed', {
            strings: ["C:/User/Connexion..."],
            typeSpeed: 50,
            cursorChar: '_',
            showCursor: true
        });

        var typed2 = new Typed('#typed', {
            strings: ["Camélie Groleau vient de se connecter<br> Camélie est en train d'écrire..."],
            typeSpeed: 30,
            showCursor: false,
            startDelay: 2500
        });

        var typed3 = new Typed('#typed', {
            strings: ["Camélie: Bonjour! Je m'appelle Camélie et je suis<strong> développeuse web</strong><br><br> Camélie: Vous êtes actuellement sur mon <strong>portfolio</strong>,<br> pour voir plus de projets...<br><br>C'est ici <i class='fas fa-arrow-down'></i><br><br><a href='../html/projets.html' class='btn'>PORTFOLIO</a><br><br><br>Ou si vous avez envie de jouer,<br>vous pouvez plutôt aller ici <i class='fas fa-arrow-down'></i><br><br><a href='../html/jeu.html' class='btn'>JOUER</a>"],
            typeSpeed: 30,
            showCursor: false,
            startDelay: 7000,
        });
    }


    // PAGE DE CONTACT //

    /* Fonction qui cache le label lorsqu'on écrit dans le input */
    $("input").focus(function (e) {
        if ($(this).val().length <= 0) {
            $(this).parent().find(".disappear").toggle();
        }
    });

    $("textarea").focus(function (e) {
        if ($(this).val().length <= 0) {
            $(this).parent().find(".disappear").toggle();
        }
    });


    // Fonction qui fait réapparaître si le input est vide //
    $("input").blur(function (e) {
        if ($(this).val().length <= 0) {
            $(this).parent().find('.disappear').toggle();
        }
    });

    $("textarea").blur(function (e) {
        if ($(this).val().length <= 0) {
            $(this).parent().find('.disappear').toggle();
        }
    });


    /* Animation du vaisseau */
    if ($("#chemin").length > 0) {
        var path = anime.path('#chemin');

        var motionPath = anime({
            targets: '#vaisseau',
            translateX: path('x'),
            translateY: path('y'),
            easing: 'linear',
            duration: 1800,
        });
    }
    


    // PAGE DE JEU //

    if ($('#section4').length > 0) {

        play = true;
        position = 0;
        positionY = 0;
        let persoY = parseInt($("#vaisseau").css("top").replace('px', ''));

        /* Fonction lors de l'appui des touches */
        $(document).keydown(function (e) {
            keys = [e.keyCode];
            keys[e.keyCode] = true;

            if (keys[38] && keys[32]) {
                upMove();
                animTir();
            }

            else if (keys[38]) {
                upMove();
            }

            if (keys[40] && keys[32]) {
                downMove();
                animTir();
            }

            else if (keys[40]) {
                downMove();
            }

            if (keys[32]) {
                animTir();
            }
        });


        /* Mouvement de descente */
        function downMove() {
            if (persoY <= 680) {
                persoY += 20;
                bulletY = persoY + 75;

                $('#vaisseau').css({ top: persoY + "px" });
            }

            if (persoY >= 410) {
                $("#direction").css({ "opacity": 0 });
            }

            if (persoY < 410) {
                $("#direction").css({ "opacity": 1 });
            }
        }


        /* Mouvement de monté */
        function upMove() {
            if (persoY >= 30) {
                persoY = persoY - 20;
                bulletY = persoY + 75;
                $('#vaisseau').css({ top: persoY + "px" });

            }

            if (persoY < 410) {
                $("#direction").css({ "opacity": 1 });
            }

        }
    }


    // AFFICHAGE DU MENU MOBILE //
    let activators = document.getElementsByClassName("activator");
    let i;

    for (i = 0; i < activators.length; i++) {
        activators[i].addEventListener("click", function () {
            let activatedId = this.getAttribute("data-activate");
            let activateElement = document.getElementById(activatedId);
            activateElement.classList.toggle("hide");
        })
    }



    // FUNCTIONS //

    /* Animation du background du header */
    function animPois() {
        $('.animPois').each(function () {
            let y = Math.random() * 25 + 5;

            $(this).animate({
                cy: y + "%"
            }, 400, "swing");
        })
    }


    /* Création et animation des météorites */
    function meteorFall() {

        $("#startMeteor").append("<div class='meteorDroit absolute meteor' id='meteorContainer" + compteur + "'><img src='../img/meteor.svg'/></div>");
        $("#meteorContainer" + compteur).each(function () {
            let y = Math.random() * 85;

            $(this).animate({
                left: "0",
                top: y + "%"
            }, 3500, "linear", function () {
                let position = $(this).css("left");
                let life = $("#life").html();

                if (position == "0px") {
                    $(this).remove();

                    if (life > 0) {
                        life = life - 1;
                        $("#life").html(life);
                    }
                }

                if (life == 0) {
                    $("#gameover").css("display", "flex");
                    $("#section4").css("display", "none");
                    clearInterval(meteorInterval);
                }
            });
        });

        if (compteur == 20) {
            clearInterval(meteorInterval);
        }

        compteur++;
    }


    /* Animation du tir des balles */
    function animTir() {
        let tir = document.getElementById('tir');

        let bullet = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        bullet.setAttribute("class", "animTir");
        bullet.setAttribute("width", "11px");
        bullet.setAttribute("height", "4px");
        bullet.setAttribute("style", "fill:white");

        document.getElementById("section4").appendChild(tir);
        document.getElementById("tir").appendChild(bullet);

        $('.animTir').each(function () {
            let x = 100;
            let persoY = parseInt($("#vaisseau").css("top").replace('px', ''));
            let y = persoY + 75;

            if (typeof $(this).attr("data") == "undefined") {
                $(this).attr("y", y + "px");
            }

            $(this).animate({
                x: x + "%"
            }, 1000, "linear", function () {
                $(this).remove();
            });
        });

    }


    /* Vérification des positions */
    function verifXY() {
        let positionBulletX;
        let positionBulletY
        let meteorW;
        let meteorH;
        let meteorX;
        let meteorY;

        $('.animTir').each(function () {
            bulletW = $(this).width();
            positionBulletX = Math.round($(this).offset().left) + bulletW;
            positionBulletY = Math.round($(this).offset().top);

            $(".meteor").each(function () {
                meteorW = $(this).width();
                meteorH = $(this).height();
                meteorX = Math.round($(this).offset().left);
                meteorY = Math.round($(this).offset().top);

                if ((positionBulletX >= meteorX &&
                    positionBulletX <= (meteorX + meteorW)) &&
                    (positionBulletY >= meteorY &&
                        positionBulletY <= (meteorY + meteorH))) {

                    $(this).stop().remove();

                    let score = parseInt($("#score").html());

                    score = score + 100;
                    $("#score").html(score);

                }
            });
        });

        if ((compteur == 21 && typeof $("#meteorContainer20").offset() == "undefined")) {
            clearInterval(meteorInterval);
            $("#finishGame").css("display", "flex");
            $("#section4").css("display", "none");
        }
    }
});


// Travail entièrement créé et réalisé par Camélie Groleau //