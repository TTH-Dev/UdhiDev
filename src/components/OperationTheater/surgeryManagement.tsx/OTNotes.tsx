import { Button } from "antd"
import TextArea from "antd/es/input/TextArea"

const OTNotes = () => {
  return (
    <>
    
    <div className="emr-complaints-box mt-4 mx-3 rounded p-3" >
        <p className="emr-search-text ps-2">Ot Notes</p>

        <TextArea rows={4}/>

      
    </div>
      <div className="text-end  my-4">
      <Button className="c-btn me-5">
          Cancel
      </Button>
      <Button className="s-btn me-3">
          Save
      </Button>
    </div>
    </>

  )
}

export default OTNotes
