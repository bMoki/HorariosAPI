import { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineClear } from "react-icons/ai";
import { DisciplinaContext } from "contexts/DisciplinaContext";
import ProfessorContextProvider from "contexts/ProfessorContext";
import TableProf from "components/Table/Professor";





function ComboBoxProf() {

    const { nome, nomeHandler, btnOperation, handleClear
    } = useContext(DisciplinaContext);



    return (
        <>
            <label htmlFor="comboBox" className="form-label" >Professores</label>
            <div className="form-group">
                <select id="framework" name="framework[]" multiple className="form-control" >
                    <option value="Codeigniter">Codeigniter</option>
                    <option value="CakePHP">CakePHP</option>
                    <option value="Laravel">Laravel</option>
                    <option value="YII">YII</option>
                    <option value="Zend">Zend</option>
                    <option value="Symfony">Symfony</option>
                    <option value="Phalcon">Phalcon</option>
                    <option value="Slim">Slim</option>
                </select>
            </div>



        </>
    );
};
export default ComboBoxProf;
