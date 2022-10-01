import { Button } from '@material-ui/core';
import React  from 'react';
function UCTest() {
  
  const openNewPage = () => {
    window.open("https://partnerapp.urbanclap.com/startJobTrainingCompleted");
    // window.open("https://partnerapp.urbanclap.com/calendarTrainingCompleted");
  };

    return (
        <div>
          <Button onClick={openNewPage}>CHECK</Button>
        </div>
    )
}

export default UCTest

// onCopy={() => this.setState({copied: true})}