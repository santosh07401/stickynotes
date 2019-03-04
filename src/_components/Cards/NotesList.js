import React from 'react'
import {NotesComponent} from "./Notes";
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap'
import NotesModal from "../Modal/NotesModal";
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import {userActions} from '../../_actions';
import {NotesSaveModal} from "../Modal/NotesSaveModal";

const NotesLayout = styled.div`
    width:100%;
    height:100%;
`

class NotesList extends React.Component {
    constructor() {
        super()
        this.handleClose = this.handleClose.bind(this);
        this.showPopup = this.showPopup.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {showModal: false}

    }

    componentDidMount() {
        let dispatch = this.props.dispatch;
        dispatch(userActions.fetchDataForUser())
    }

    handleClose() {
        this.setState({showModal: false})
    }

    onSave(note) {
        console.log('save note called ' + JSON.stringify(note))
        this.props && this.props.dispatch(userActions.saveNote(note))
    }

    showPopup(notes) {
        this.setState({
            notesId: notes.id,
            notesContent: notes.content,
            notesTitle: notes.title,
            showModal: true
        })
    }

    render() {
        let res = []
        let map = this.props.notesMap;
        for (let key in map) {
            if (map.hasOwnProperty(key)) {
                let item = map[key];
                res.push(<Col xs={12} sm={12} md={12} lg={6}><NotesComponent id={item.id} title={"note- " + item.id}
                                                                             content={item.content}
                                                                             showPopup={this.showPopup}></NotesComponent></Col>)
            }
        }

        let showModal = this.state && this.state.showModal;
        let saved = this.props.saveNoteData == "success";
        console.log('save not data ' + this.props.saveNoteData)
        let savedDataModal = this.props.saveNoteData == "success" || this.props.saveNoteData == "failed"
        return (
            <NotesLayout>
                <div style={{'width': '100%', display:'flex',flexFlow:'row-reverse'}}>

                    <Button onClick={()=>{this.props.dispatch(userActions.logout());window.location.reload();}}>logout</Button>

                </div>
                {!showModal && <Container>
                    <Row>
                        {res}
                    </Row>
                </Container>}
                {!savedDataModal && showModal ?
                    <NotesModal notesId={this.state.notesId} content={this.state.notesContent}
                                title={this.state.notesTitle} showModal={showModal + ""} onClose={this.handleClose}
                                onSave={this.onSave}/> : ""}
                {savedDataModal ?
                    <NotesSaveModal content={saved ? "saving of note is successfull" : "Saving of note failed"}
                                    title={saved ? "Saved Note" : "Failed to save note"} showModal={savedDataModal + ""}
                                    onRefresh={() => {
                                        window.location.reload()
                                    }}/> : ""}
            </NotesLayout>
        )
    }
}

function mapStateToProps(state) {
    const {noteMapData, saveNoteData} = state.authentication;
    return {
        notesMap: noteMapData ? noteMapData.map : {},
        saveNoteData: saveNoteData ? saveNoteData.saved : ""
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(NotesList);
export {connectedLoginPage as NotesList};
