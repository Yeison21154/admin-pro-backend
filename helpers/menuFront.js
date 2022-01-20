const getMenuFronEnd = (role="USER_ROLE") =>{

    const menu=[
            {titulo:'Principal',
            icono: 'mdi mdi-gauge',
            submenu:[
            {titulo: 'Dashboard',url:'/'},
            {titulo: 'ProgressBar',url:'progress'},
            {titulo: 'Graficas',url:'grafica1'},
            {titulo: 'promesas',url:'promesas'},
            {titulo: 'rxjs',url:'rxjs'}
        ]
        },
            {titulo:'Mantenimiento',
            icono: 'mdi mdi-folder-lock-open',
            submenu:[
            {titulo: 'Hospitales',url:'hospitales'},
            {titulo: 'Medicos',url:'medicos'}
        ]
        }
    ]
    if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift({titulo: 'Usuarios',url:'usuarios'},);
    }
    return menu;
}
module.exports ={getMenuFronEnd}