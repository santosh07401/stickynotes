import React from 'react'
import {Button, Modal} from 'react-bootstrap'


export default class NotesModal extends React.Component {


    constructor() {
        super()

    }
    componentDidMount(){
        this.props && (this.setState({typed:this.props.content}))
    }

    onChange(event){
        this.setState({typed: event.target.value});
    }

    render() {
        return (
            <Modal.Dialog show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input style={{'width':'100%'}} value={this.state? this.state.typed:""} onChange={this.onChange.bind(this)}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>Close</Button>
                    <Button variant="primary" onClick={()=>{this.props.onSave({id:this.props.notesId,title:this.props.title,content:this.state.typed})}}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
