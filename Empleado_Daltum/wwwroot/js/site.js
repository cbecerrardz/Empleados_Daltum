
$(document).ready(function () {

    let Id;
    ///Datatable Empleados
    $('#empleadoTable').DataTable({
        ajax: {
            url: "http://localhost:5214/api/Empleado/",
            dataSrc: ""
        },
        success: function (data) {
            console.log(data);
        },
        failure: function (response) {
            alert(response.responseText);
        },
        error: function (req, textStatus, errorThrown) {
            alert('Wow algo salio mal ' + textStatus + ' ' + errorThrown);
        },
        columns: [
            {
                data: "idEmpleado"
            },
            {
                data: null, render: function (data, type, row) {
                    // Combine the first and last names into a single table field
                    return data.nombre + ' ' + data.apellido_Paterno + ' ' + data.apellido_Materno;
                }
            },
            { data: "email" },
            { data: "puesto" },
            { data: "rfc" },
            { data: "direccion" },
            { data: "fecha_Alta" },
            { data: "fecha_Baja" },
            { data: "estatus" },
            {
                data: null,
                render: function (data, type, full, meta) {
                    return '<button class="btn btn-primary"><i class="fa fa-pencil"></i></button>';
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return '<a href="#" class="btn btn-danger" onclick=DeleteData("' + row.idEmpleado + '","' + row.estatus + '");><i class="fa fa-trash"></i></a>';
                },
                orderable: false
            },
            { data: "telefono" },
            { data: "estado_Civil" }
        ],
        columnDefs: [
            {
                targets: 6, render: function (data) { return moment(data).format('DD/MM/YYYY'); }
            },
            {
                targets: 5, visible: false
            },
            {
                targets: 7, visible: false
            },
            {
                targets: 8, visible: false
            },
            {
                targets: 11, visible: false
            },
            {
                targets: 12, visible: false
            }
        ],
        dom: 't'
    });

    ///Boton Editar Tabla
    $('#empleadoTable').on('click', 'button', function (e) {
        var tr = $(this).closest('tr');
        var data = $('#empleadoTable').DataTable().row(tr).data();
        console.log(data);
        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear() + "-" + (month) + "-" + (day);

        var result = moment(data.fecha_Baja).format('YYYY-MM-DD');
        console.log(result);
        $('#frmE')[0].reset();
        $('moE').removeClass('overlay');
        $('#anilloE').removeClass('anillo');
        $('#modalEditar').modal('show');
        $('input[type=hidden]').val(data.idEmpleado);

        $("#e-email").val(data.email);
        $("#e-pso").val(data.puesto);
        $("#e-tel").val(data.telefono);
        $("#e-ec").val(data.estado_Civil);
        $("#e-dir").val(data.direccion);
        if (data.fecha_Baja == null) {
            $("#e-fchB").prop('value', new Date());
            $('#inputId').attr('readonly', true);
        } else {
            $('#inputId').prop('readonly', false);
            $("#e-fchB").attr('value', result);
        }
    });

    // 
    //$('#empleadoTable').on('click', 'a', function (e) {
    //        e.preventDefault();

    //});

    ///Acciones en modales
    $("#btnBuscar").click(function () {
        $('#modalBusqueda').modal('show');
        $('#frmB')[0].reset();

    });

    $("#btnUpdate").click(function () {
        //$('#moA').addClass('overlay');
        //$('#anilloA').addClass('anillo');
        $("#empleadoTable").DataTable().ajax.reload();
    });


    $("#btnNuevo").click(function () {
        $('#frmA')[0].reset();
        $('#modalAlta').modal('show');
    });


    //$('#first-name').val(), "last-name": $('#last-name').val() }
    ////
    //Botones JQUERY con acciones AJAX
    ////

    /// Alta de empleados
    $("#btnCrear").click(function () {
        if (
            $("#tel-name").val().length == 0 || $("#email-name").val().length == 0 ||
            $("#puesto-name").val().length == 0 || $("#rfc-name").val().length == 0 || $("#ecivil-name").val().length == 0 ||
            $("#gen-name").val().length == 0 || $("#dir-name").val().length == 0 || $("#fchnac-name").val() === '')
        {

            alert("Hay campos Vacios");

        }
        else {
            let name = $("#name").val();
            let apellidp_p = $("#app-name").val()
            let apellido_m = $("apm-name").val() != '' ? $("#apm-name").val() : null;;
            let tel = $("#tel-name").val();
            let email = $("#email-name").val();
            let fnac = $("#fchnac-name").val();
            let pso = $("#puesto-name").val();
            let rfc = $("#rfc-name").val();
            let ec = $("#ecivil-name").val();
            let dir = $("#dir-name").val();
            let genero = $("#gen-name").val();
            let edad = calcularEdad($("#fchnac-name").val());
            let datos = { IdEmpleado: 0, Nombre: name, Apellido_Paterno: apellidp_p, Apellido_Materno: apellido_m, Fecha_Nacimiento: fnac, estado_Civil: ec, RFC: rfc, Direccion: dir, Email: email, Telefono: tel, Puesto: pso, Genero: genero, Edad: edad,IdGenero: 1,IdEdoCivil: 1 };
            console.log(datos);
            $.confirm({
                title: 'Alta de Empleados',
                content: '¿Los datos son correctos para el nuevo empleado?',
                buttons: {
                    confirm: function () {
                        $('#moA').addClass('overlay');
                        $('#anilloA').addClass('anillo');
                        fetch('http://localhost:5214/api/Empleado/', {
                            method: 'POST',
                            body: JSON.stringify(datos),
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': 'application/json;charset=UTF-8'
                                //headers: { 'Access-Control-Allow-Origin': '*' }
                            }
                            //mode: 'cors',
                        })
                            .then(response => {
                                console.log(response);
                                $('#moA').removeClass('overlay');
                                $('#anilloA').removeClass('anillo');
                                $('#modalAlta').modal('hide');
                                if (response.status == 200) {                                
                                    alert('Creacion de empleado exitoso!!!');
                                    $("#empleadoTable").DataTable().ajax.reload();
                                } else {
                                    alert('Surgio un problema al dar de alta al empleado!!!');
                                }
                            })
                            .catch(error => {
                                console.error('Error en la Alta de empleado.', error)
                                $('#moA').removeClass('overlay');
                                $('#anilloA').removeClass('anillo');
                                $('#modalAlta').modal('hide');
                            });
                    },
                    cancel: function () {
                        return true;
                    }
                }
            });
        }
    });

    /// buscar de empleados
    $("#btnSearch").click(function () {
        var nom = $("#b-name").val();
        var rfc = $("#b-rfc").val();
        var est = $("#b-estatus").val();
        if (nom.length == 0 && rfc.length == 0 && est == '') {
            alert("LLena al menos un campo");
        } else {
            $.confirm({
                title: 'Buscar',
                content: '¿Son los datos correctos?',
                buttons: {
                    confirm: function () {
                        $('#moB').addClass('overlay');
                        $('#anilloB').addClass('anillo');
                        fetch('http://localhost:5214/api/Empleado/Busqueda', {
                            method: 'POST',
                            body: JSON.stringify({ Nombre: nom, RFC: rfc, Estatus: est }),
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': 'application/json; charset=UTF-8',
                            },
                        })
                            .then(response => response.json())
                            .then(data => {
                                $('#moB').removeClass('overlay');
                                $('#anilloB').removeClass('anillo');
                                $('#empleadoTable').DataTable().clear().rows.add(data).draw();
                                $('#modalBusqueda').modal('hide');
                            })
                            .catch(error => {
                                console.error('Error en la busqueda de empleado.', error)
                                $('#moB').removeClass('overlay');
                                $('#anilloB').removeClass('anillo');
                                $('#modalBusqueda').modal('hide');
                            }
                            );
                    },
                    cancel: function () {
                        return true;
                    }
                }
            });
        }

    });

    ///Actualizar Empleado
    $("#btnEdit").click(function () {
        if ($("#e-dir").val().length == 0 || $("#e-email").val().length == 0 || $("#e-pso").val().length == 0 || $("#e-tel").val().length == 0 || $("#e-ec").val().length == 0 )
        {
            alert("Hay campos Vacios");
        }
        else {

            let id = $('input[type=hidden]').val();
            let email = $("#e-email").val();
            let pso= $("#e-pso").val();
            let tel= $("#e-tel").val();
            let ec = $("#e-ec").val();
            let dir= $("#e-dir").val();
            let fB = ($("#e-fchB").val() != '') ? $("#e-fchB").val() : null;
            console.log(fB);
            $.confirm({
                title: 'Actualizar Datos',
                content: '¿Esta seguro de actualizar los datos?',
                buttons: {
                    confirm: function () {
                        $('#moE').addClass('overlay');
                        $('#anilloE').addClass('anillo');
                        fetch('http://localhost:5214/api/Empleado/' + id, {
                            method: 'PUT',
                            body: JSON.stringify({ IdEmpleado: id, Estado_Civil: ec, Direccion: dir, Email: email, Telefono: tel, Puesto: pso, Fecha_Baja: fB, Nombre: '', Genero : '' , Apellido_Paterno: '' }),
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': 'application/json;charset=UTF-8'
                                 //headers: { 'Access-Control-Allow-Origin': '*' }
                            }
                            //mode: 'cors',
                        })
                            .then(() => {
                                $('#moE').removeClass('overlay');
                                $('#anilloE').removeClass('anillo');
                                alert('Empleado modificado');
                                $('#modalEditar').modal('hide');
                                $("#empleadoTable").DataTable().ajax.reload();
                                //var data = JSON.parse(myData);
                              
                                //$("#empleadoTable").DataTable().ajax.reload();
                            })
                            .catch(error => {
                                console.error('Error en la modificacion de empleado.', error)
                                $('#moE').removeClass('overlay');
                                $('#anilloE').removeClass('anillo');
                            }
                            );
                    },
                    cancel: function () {
                        return true;
                    }
                }
            });
        }


    });

    //Ocultar mascara
    //$('#spinnerH').removeClass('overlay');
    //$('#anilloH').removeClass('anillo');

    ///Eventos al Cierre de modales
    $('#modalAlta').on('hidden.bs.modal', function () {
        $('#moA').removeClass('overlay');
        $('#anilloA').removeClass('anillo');
    })
    $('#modalBusqueda').on('hidden.bs.modal', function () {
        $('.overlay').hide();
        $('.anillo').hide();
    })
    $('#modalEditar').on('hidden.bs.modal', function () {
        $('.overlay').hide();
        $('.anillo').hide();
    })

});


///Acciones a API
function DeleteData(id, estatus) {  
    if (estatus == 'B') {
        alert('El empleado ya esta dado de baja');
    } else {
        $.confirm({
            title: 'Dar de baja',
            content: '¿Esta seguro de darlo de baja?',
            buttons: {
                confirm: function () {
                    $('#spinnerH').addClass('overlay');
                    $('#anilloH').addClass('anillo');
                    fetch('http://localhost:5214/api/Empleado/' + id, {
                        method: 'DELETE',
                        //mode: 'cors',
                        //headers: { 'Access-Control-Allow-Origin': '*' }
                    })
                        .then(() => {
                          $('#spinnerH').removeClass('overlay');
                          $('#anilloH').removeClass('anillo');
                          alert('Empleado dado de baja');
                          $("#empleadoTable").DataTable().ajax.reload();
                     })
                        .catch(error => {
                            console.error('Error en la baja de empleado.', error)
                            $('#spinnerH').removeClass('overlay');
                            $('#anilloH').removeClass('anillo');
                        }
                     );                     
                },
                cancel: function () {
                    return true;
                }
            }
        });
    }
};




function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    return edad;
}