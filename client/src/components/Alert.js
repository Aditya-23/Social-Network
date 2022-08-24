import React from 'react'
import { Alert } from 'react-bootstrap'
import {connect} from 'react-redux'

const AlertComp = props => props.alerts != null && props.alerts.length > 0 && props.alerts.map(alert => (
    <Alert variant={alert.alertType}>
        {alert.message}
    </Alert>
))

const mapStateToProps = state => ({
    alerts: state.alertReducer
})


export default connect(mapStateToProps)(AlertComp)