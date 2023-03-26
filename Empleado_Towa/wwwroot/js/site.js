
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
            //this is going to happen when you send something different from a 200 OK HTTP
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
                    return '<a class="btn btn-primary"><i class="fa fa-pencil"></i></a>';
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return '<a href="#" class="btn btn-danger" onclick=DeleteData("' + row.idEmpleado + '","' + row.estatus + '");><i class="fa fa-trash"></i></a>';
                },
                orderable: false
            }
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
            }
        ],
        dom: 't'
    });

    ///Boton Editar Tabla
    $('#empleadoTable').on('click', 'tr', function (e) {
        var tr = $(this).closest('tr');
        var data = $('#empleadoTable').DataTable().row(tr).data();
        console.log(data);
        $('#frmE')[0].reset();
        $('moE').removeClass('overlay');
        $('#anilloE').removeClass('anillo');
        $('#modalEditar').modal('show');
    });

    // 
    //$('#empleadoTable').on('click', 'td.btn-danger', function (e) {
    //        e.preventDefault();

    //        editor.remove($(this).closest('tr'), {
    //            title: 'Dar de baja',
    //            message: '¿Esta seguro de dar de baja?',
    //            buttons: 'Delete'
    //        });
    //});

    ///Acciones en modales
    $("#btnBuscar").click(function () {
        //$('#moB').addClass('overlay');
        //$('#anilloB').addClass('anillo');
        $('#modalBusqueda').modal('show'); 
        $('#frmB')[0].reset();

    });

    $("#btnUpdate").click(function () {
        $('#moA').addClass('overlay');
        $('#anilloA').addClass('anillo');
        $("#empleadoTable").DataTable().ajax.reload();
    });


    $("#btnNuevo").click(function () {
        //$('#moA').addClass('overlay');
        //$('#anilloA').addClass('anillo');
        $('#frmA')[0].reset();
        $('#modalAlta').modal('show');
    });


    //$('#first-name').val(), "last-name": $('#last-name').val() }
    ////
    //Botones JQUERY con acciones AJAX
    ////

    /// Alta de empleados
    $("#bntCrear").click(function () {
        $.confirm({
            title: 'Dar de baja',
            content: '¿Esta seguro de darlo de baja?',
            buttons: {
                confirm: function () {
                    $('#moA').addClass('overlay');
                    $('#anilloA').addClass('anillo');
                    fetch('http://localhost:5214/api/Empleado/', {
                        method: 'POST',
                        body: JSON.stringify({ name: namevalue, address: addressvalue }),
                        headers: {
                            'Accept': 'application/json; charset=utf-8',
                            'Content-Type': 'application/json;charset=UTF-8'
                            //headers: { 'Access-Control-Allow-Origin': '*' }
                        }
                        //mode: 'cors',
                    })
                        .then(() => {
                            $('#moA').removeClass('overlay');
                            $('#anilloA').removeClass('anillo');
                            alert('Empleado dado de Alta');
                            $("#empleadoTable").DataTable().ajax.reload();
                        })
                        .catch(error => {
                            console.error('Error en la Alta de empleado.', error)
                            $('#moA').removeClass('overlay');
                            $('#anilloA').removeClass('anillo');
                        }
                        );
                },
                cancel: function () {
                    return true;
                }
            }
        });
    });

    ///Actualizar Empleado
    $("#btnEdit").click(function () {
        if (document.forms['frm'].name.value === "") {
            alert("empty");
        } else {
            $.confirm({
                title: 'Actualizar Datos',
                content: '¿Esta seguro de actualizar los datos?',
                buttons: {
                    confirm: function () {
                        $('#moE').addClass('overlay');
                        $('#anilloE').addClass('anillo');
                        fetch('http://localhost:5214/api/Empleado/' + Id, {
                            method: 'PUT',
                            body: JSON.stringify({ name: namevalue, address: addressvalue }),
                            headers: {
                                'Accept': 'application/json; charset=utf-8',
                                'Content-Type': 'application/json;charset=UTF-8'
                                 //headers: { 'Access-Control-Allow-Origin': '*' }
                            }
                            //mode: 'cors',
                        })
                            .then(() => {
                                response => response.json();
                                $('#moE').removeClass('overlay');
                                $('#anilloE').removeClass('anillo');
                                alert('Empleado modificado');
                                //var data = JSON.parse(myData);
                                var myTable = $('#empleadoTable').DataTable().clear().rows.add(response).draw();
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
                        return false;
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