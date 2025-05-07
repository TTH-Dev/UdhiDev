import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button, Checkbox } from "antd";

const Medicine = () => {
  return (
    <>
      <div className="emr-complaints-box ms-3 mt-4 rounded p-4">
        <p className="emr-label">Medication Chart</p>
        <div>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{color:"#595959"}}>Date</TableCell>
                  <TableCell style={{color:"#595959"}}>Name</TableCell>
                  <TableCell style={{color:"#595959"}}>Mrg</TableCell>
                  <TableCell style={{color:"#595959"}}>Aft</TableCell>
                  <TableCell style={{color:"#595959"}}>Eve</TableCell>
                  <TableCell style={{color:"#595959"}}>Ngt</TableCell>
                  <TableCell style={{color:"#595959"}}>Instruction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row"  style={{color:"#595959"}}>
                    sdd
                  </TableCell>
                  <TableCell  style={{color:"#595959"}}>sad</TableCell>
                  <TableCell  style={{color:"#595959"}}>
                    sad
                    <div>
                      <Checkbox className="me-1" />
                      Given
                    </div>
                  </TableCell>
                  <TableCell  style={{color:"#595959"}}>
                    sad
                    <div>
                      <Checkbox className="me-1" />
                      Given
                    </div>
                  </TableCell>
                  <TableCell  style={{color:"#595959"}}>
                    sad
                    <div>
                      <Checkbox className="me-1" />
                      Given
                    </div>
                  </TableCell>
                  <TableCell  style={{color:"#595959"}}>
                    sad
                    <div>
                      <Checkbox className="me-1" />
                      Given
                    </div>
                  </TableCell>
                  <TableCell  style={{color:"#595959"}}>sd</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="d-flex justify-content-end save-cancel-btn mt-4 mb-3">
        <Button className="c-btn me-3">Cancel</Button>
        <Button className="s-btn ">Save</Button>
      </div>
    </>
  );
};

export default Medicine;
