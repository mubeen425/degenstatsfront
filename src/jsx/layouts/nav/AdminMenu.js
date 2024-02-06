export const AdminMenuList = [

    //DashBoard
    {   
        title:'Admin DashBoard',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">grid_view</i>,
        to: 'admindashboard',
        key : 'admin_dashboard',
    },

    //BUY
    {   
        title:'Sell Requests',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">currency_bitcoin</i>,
        to: 'requests',
        key: 'requests',
    },


    //SELL
    {   
        title:'Buy History',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">currency_bitcoin</i>,
        to: 'admin-buy-history',
        key: 'admin_buy_history',


    },

    //STAKE
    {   
        title:'Stake History',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="material-icons">currency_bitcoin</i>,
        to: 'admin-stake-history',
        key: 'admin_stake_history',
    },

    //Settings
    {   
        title:'Settings',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="bi bi-gear-wide"></i>,
        to: 'admin-setting',
        key: 'admin_setting',
    },
    {   
        title:'Tasks',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="bi bi-gear-wide"></i>,
        to: 'complete-task',
        key: 'admin_setting',
    },
    {   
        title:'Tasks',
        //classsChange: 'mm-collapse',
        iconStyle: <i className="bi bi-gear-wide"></i>,
        to: 'create-task',
        key: 'Create task',
    },
  
    
]