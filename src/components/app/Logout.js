import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Logout extends Component {


    render() {
        return (
            sessionStorage.clear()
        )
    }
}
