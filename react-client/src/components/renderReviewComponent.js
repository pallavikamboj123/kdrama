import React, {Component} from 'react';
import {Card,Modal, ModalBody, ModalHeader} from 'reactstrap';


function RenderSpoiler({spoiler}){
    if(spoiler === true){
        return(
            <div>
                <h5>Spolier Alert</h5>
            </div>
        );

    }
    else{
        return(
            <div>
                <h5>No Spoiler</h5>
            </div>
        );
    }
}

class RenderLeadReview extends Component{
    constructor(props){
        super(props);

        this.state = {
            isloginModalOpen: false
        }

        this.logintoggleModal = this.logintoggleModal.bind(this);
    }
    logintoggleModal(){
        this.setState({
            isloginModalOpen: !this.state.isloginModalOpen
        });
    }

    render(){
        const item = this.props.item;
        var fullReview = item.attributes.contentFormatted.replace(/<\/?[^>]+>/gi, '');
        var shortReview;
            if(item.attributes.contentFormatted.length > 100){
                shortReview = item.attributes.contentFormatted.replace(/<\/?[^>]+>/gi, '').substring(0,100)+'...𝙧𝙚𝙖𝙙 𝙢𝙤𝙧𝙚';
            }
            else{
                shortReview = item.attributes.contentFormatted.replace(/<\/?[^>]+>/gi, '');
            }
        return(
            <>
            <div key={item.id} className="col-12 col-md-4 mb-4"  onClick= {this.logintoggleModal}>
                    <Card style={{background: 'linear-gradient(to right top, #424242, #404040, #3e3e3e, #3c3c3c, #3a3a3a)',
                                color: 'white', borderRadius: '20px', height:'270px'
                            }}>
                        <div className="container mt-1 mb-1">
                            <div className="row justify-content-between mt-1 mb-2">
                                <div className="ml-2">
                                    <h3 style={{color:'#f32227', fontWeight: 'bold'}}>{item.attributes.rating}</h3>
                                </div>
                                <div className="mr-2" style={{color: 'rgb(151,151,151'}}>
                                    <RenderSpoiler spoiler={item.attributes.spoiler} />
                                </div>
                            </div>
                            <div className="row mb-1 mt-3">
                                <div className="col-12" >
                                    <h4 style={{color: '#fff'}}> {shortReview}</h4>
                                </div>
                            </div>
                        </div>
                    </Card>
                    <Modal isOpen ={this.state.isloginModalOpen} contentClassName="modalmainpage" className="mt-5" toggle={this.logintoggleModal} >
                    <ModalHeader  className="modal-header" toggle={this.logintoggleModal}>Full Review</ModalHeader>
                    <ModalBody>
                        <p>{fullReview}</p>
                    </ModalBody>
                </Modal>
                </div>
                
                
            </>
        );
    }
}

function RenderItem({reviews}){
    if(reviews){

        
        return reviews.map((item)=> {
            
            return(
                <RenderLeadReview item = {item} />
            );
        })
    }
    else{
        return(
            <div>
                Loading Reviews
            </div>
        );
    }
    
}

function RenderReview({reviews}){
    return(
        <>
            <div className="col-12 mb-5" style={{background: 'rgb(245, 244, 244'}}>
                <h2 style={{fontWeight: 'bold', textAlign: 'center'}} className="mt-4 mb-5 ml-5">Reviews</h2>
                <div className="container">
                    <div className="row  mb-5">
                        <RenderItem reviews={reviews}/>
                    </div>
                </div>
            </div>
        </>
    );
}
export default RenderReview;