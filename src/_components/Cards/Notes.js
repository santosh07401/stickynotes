import React from 'react';
import styled from 'styled-components';
import {Button} from 'react-bootstrap'
import NotesModal from "../Modal/NotesModal";

const Title = styled.p`
  font-size: 1em;
  text-align: center;
  color: palevioletred;
`;
const Content = styled.p`
  font-size: 0.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
min-width:300px;
  padding: 2em;
  margin:5px;
  border-radius:10px;
  background: papayawhip;
`;
const HorizontalContainer = styled.div`
    display:flex;
    width:100%;
    layout-direction:horizontal;
`

export class NotesComponent extends React.Component {

    render() {
        return <Wrapper>
            <HorizontalContainer>
                <a onClick={() => alert('close clicked')}>x</a>
                <p style={{"width": "80%"}}></p>
                <a onClick={() =>  this.props.showPopup({
                     title:"New note", content: ""
                })}>+</a>
            </HorizontalContainer>
            <Title>{this.props.title}</Title>
            <Content>{this.props.content}</Content>
            <HorizontalContainer>
                <Button style={{'width': '100%'}} onClick={() => {
                    this.props.showPopup({
                        id: this.props.id, title: this.props.title, content: this.props.content
                    })
                }}>Edit</Button>
            </HorizontalContainer>
        </Wrapper>

    }
}
