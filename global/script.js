var nombre_local = "";

function entersavename(event) {
// Numero 13 es la tecla "Enter" del teclado
if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("identi").click();
  }
}

function entersendtext(event) {
// Numero 13 es la tecla "Enter" del teclado
    if (event.keyCode === 13) {
        event.preventDefault();
        enviarMensaje();
      }
    }

$(document).ready(function () {
    $('#myModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });

});

function guardarName(param) {
    nombre = param;
    nombre_local = nombre;
    socket.emit("login", {"name":nombre, "socketid":socket.id});
}

const socket = io.connect();

function enviarMensaje() {
    msm = $("#mensaje_a_enviar").val();
    socket.emit("enviarMensaje", {"name":nombre, "messaje":msm});
    $("#mensaje_a_enviar").val("");
}



socket.on("forAllMensaje", (data) => {
    console.log(data);
    var clase = "message";
    if (data.name == nombre_local) {
        clase = "message darker";
    }

    $("#cajademensajes").append(`<div class=" `+ clase + ` media msg ">
    <a class="pull-left" href="#">
        <img class="media-object"  alt="64x64"
            style="width: 32px; height: 32px;"
            src="https://img.icons8.com/pastel-glyph/64/000000/person-male.png">
    </a>
    <div class="media-body">
        <h5 class="media-heading">`+ data.name + `</h5>
        <small class="col-lg-10">`+ data.messaje + `</small>
    </div>
</div>`);
});
