$(document).ready(function () {
    var character = [
        obiWan = {
            name: "Obi-Wan Kenobi",
            hp: 120,
            atkPower: 15,
            level: 1,
            image: "assets/images/obiwan.jpg",
            audio: $('#obi-wan')
        },
        lukeSkywalker = {
            name: "Luke Skywalker",
            hp: 110,
            atkPower: 10,
            level: 1,
            image: "assets/images/skywalker.jpg",
            audio: $("#skywalker")
        },
        darthSidious = {
            name: "Darth Sidious",
            hp: 150,
            atkPower: 20,
            level: 1,
            image: "assets/images/darthsidious.jpg",
            audio: $("#darth-sidious")
        },
        darthMaul = {
            name: "Darth Maul",
            hp: 170,
            atkPower: 25,
            level: 1,
            image: "assets/images/darthmaul.jpg",
            audio: $("#darth-maul")
        }
    ]
    var playerOne = "";
    var computer = "";
    var click = 1;

    starWarsGame();
    
    function starWarsGame() {
        $('.star-wars-character').remove();
        $('#reset').css('visibility', 'hidden');
        playerOne = "";
        computer = "";
        click = 1;
        $("#attack-text").text("");

        for (var i = 0; i < character.length; i++) {
            var colDiv = $("<div>").addClass("col-md-2 col-sm-4 col-xs-7 star-wars-character select-character");
            colDiv.prop({
                "name": character[i].name,
                "hp": character[i].hp,
                "atkPower": character[i].atkPower,
                "level": character[i].level,
                "audio": character[i].audio
            });
            var nameDiv = $("<div>").addClass("row text-center name").text(character[i].name);
            var hpDiv = $("<div>").addClass("row text-center hp").text("Hp: " + character[i].hp);
            var img = $("<img>").addClass("character-img").attr("src", character[i].image);
            var atkDiv = $("<div>").addClass("row text-center atk").text("Atkpower: " + character[i].atkPower);
            $("#character-selection").append(colDiv);
            var imgDiv = $("<div>").addClass("row text-center").append(img);
            $(colDiv).append(nameDiv, hpDiv, imgDiv, atkDiv);
        }
    };

    $(document).on("click", "#theme-on", function () {
        $('#theme').trigger('play');
    })
    $(document).on("click", "#theme-off", function () {
        $('#theme').trigger('pause');
    })
    $(document).on("click","#reset", function(){
        starWarsGame();
        $(this).css('visibility', 'hidden');
    })
    $(document).on("click", ".select-character", function () {
        if ($('#myCharacter').text() === "") {
            $('#myCharacter').append($(this));
            $(this).prop('audio').trigger('play');
            $(this).removeClass("select-character").addClass("selected-character");
            $(this).css('border', '2px green solid');
            playerOne = $(this);
            $('#enemy').append($("#character-selection"));

        } else if ($('#defender').text() === "") {
            $("#defender").append($(this));
            $(this).prop('audio').trigger('play');
            computer = $(this);
            $(this).addClass("selected-enemy")
            $("#attack-text").text("");
        }
    });
    $(document).on({
        mouseenter: function () {
            if ($('#defender').text() === "") {
                $("#lightsaber-on").trigger('play');
                $(this).css('border', '2px red solid');
            }
        },
        mouseleave: function () {
            if ($('#defender').text() === "") {
                $("#lightsaber-on").trigger('load');
                $(this).css('border', '2px green solid');
            }
        }
    }, ".select-character");

    $(document).on("click", "#attack", function () {
        if ($('#defender').text() !== "" && playerOne.prop("hp") > 0) {
            $("#dogfight").trigger('play');
            counter = computer.prop("atkPower");
            hit = playerOne.prop("atkPower") * click;
            click++;
            newHit = playerOne.prop("atkPower") * click;
            playerOneHp = playerOne.prop("hp") - counter;
            computerHp = computer.prop("hp") - hit;
            playerOne.prop("hp", playerOneHp);
            computer.prop("hp", computerHp);

            $("#attack-text").text("You did " + hit + " damage to " + computer.prop("name") + " and he now has " + computerHp + " hp left. " + computer.prop("name") + " did " + counter + " damage to you and you now have " + playerOneHp + ".");
            $(".selected-character>.hp").text("Hp: " + playerOneHp);
            $(".selected-character>.atk").text("New Atkpower: " + newHit);
            $(".selected-enemy>.hp").text("Hp: " + computerHp);

            if (playerOne.prop("hp") <= 0) {
                $("#chewbecca").trigger('play');
                $('#reset').attr('style', 'visibility: visible')
            } else if (computer.prop("hp") <= 0) {
                $("#attack-text").text("You killed " + computer.prop('name') + "! Pick your next opponent.");
                $("#death").trigger('play');
                $("#defender").empty();
                playerOne.prop("level", playerOne.prop("level") + 1);
            }
            if (playerOne.prop("level") === character.length) {
                $(".sound").trigger('pause');
                $("#win").trigger('play');
                $("#attack-text").text("You killed " + computer.prop('name') + "!");
                $('#reset').attr('style', 'visibility: visible');
            }
        }
    });
});