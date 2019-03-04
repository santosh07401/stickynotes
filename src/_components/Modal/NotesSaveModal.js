import React from 'react'
import {Button, Modal} from 'react-bootstrap'


export  class NotesSaveModal extends React.Component {

    render() {
        return (
            <Modal.Dialog show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p style={{'width':'100%' }} >{this.props.content}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.onRefresh}>Ok</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
