import React from 'react'

const ModalWindow = (props: any) => (
    props.open != null && props.open ?
        <div className='modal-container'>
            <div className="modal-window-container">
                <div className="modal-window">
                    <div className="modal-window-header-close">
                        <span className="modal-window-header-close-span" onClick={props.close} >⨯</span>
                    </div>
                    <div className="modal-window-header">
                        {props.title}
                    </div>
                    <div className="modal-window-body">
                        {props.children}
                    </div>
                    <div className="modal-window-footer">
                        <div className="modal-window-footer-button-container">
                            {props.actions.map((action: any, i: number) => { return <div style={{display: "inline"}} key={i}>{action}</div>})}
                        </div>
                    </div>
                </div>
            </div>
        </div>
     : null
);

export default ModalWindow;