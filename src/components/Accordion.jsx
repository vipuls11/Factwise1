import { useState } from "react";
import { FaChevronDown, FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import { FaAngleUp, FaRegCircleCheck } from "react-icons/fa6";
import { LuXCircle } from "react-icons/lu";
import './css/Accordion.css'
import Modal from "./Modal";


function Accordion({ data, searchQuery, setNewData }) {
    const [celebrity, setCelebrity] = useState({
        age: '',
        gender: '',
        country: '',
        description: '',
    });

    // console.log(celebrity)
    const [isChanged, setIsChanged] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deletid, setDeletid] = useState(null);

    const filteredData = data.filter((item) => {
        const name = `${item.first} ${item.last}`.toLowerCase();
        return name.includes(searchQuery);
    });
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null)
        }
        setSelected(i)

    }

    const edittoggle = (item) => {
        let Editid = item.id
        console.log(Editid)
        setCelebrity(item)

    }


    const deleteHandler = (deletid) => {
        const id = deletid
        const newdataarray = data.filter((elem) => elem.id !== id)
        setNewData(newdataarray)
        setIsOpen(false);
        setSelected()
    }

    const closeHandler = () => {
        setCelebrity({})
        setIsOpen(false);
        // setSelected()
    }


    const handleOpen = (item) => {
        setDeletid(item.id)
        setIsOpen(true)
    };
    const changeHandler = (event) => {
        const { name, value } = event.target;
        // console.log(name, value)
        setCelebrity((pervedata) => ({ ...pervedata, [name]: value }));
        setIsChanged(true);

    }
    const savehandler = (item) => {
        const saveid = item.id
        const map = data.map((elem) => elem.id === saveid ? celebrity : elem)
        setNewData(map)
        setCelebrity({})
        // console.log(saveid, celebrity.id, map)
        setIsChanged(false);
    }


    return (
        <div className='Wrapper'>
            <div className="accordion">
                {
                    filteredData.map((item, i) => {
                        const dob = item.dob;
                        const dobDate = new Date(dob);
                        const currentDate = new Date();
                        const ageInSeconds = (currentDate.getTime() - dobDate.getTime()) / 1000;
                        const ageInYears = Math.floor(ageInSeconds / 31536000);
                        return (
                            <div key={item.id} className='item'>
                                <div className="title" onClick={() => toggle(i)}>
                                    <h2 className="flex gap-5 items-center font-bold" ><span className=""><img src={item.picture} alt="" className="w-14 h-14" /></span>{item.first} {item.last} </h2>
                                    <span>{selected === i ? <FaChevronDown /> : <FaAngleUp />}</span>
                                </div>
                                <div className={`${selected === i ? 'content show' : 'content'}`}>
                                    {celebrity.id !== item.id ? (
                                        // {view data}
                                        <div className="">
                                            <ul className="grid grid-cols-3 py-5">
                                                <li>
                                                    <span>Age</span>
                                                    <p className="text-black">{ageInYears} Years</p>
                                                </li>
                                                <li>
                                                    <span className="">
                                                        Gender
                                                    </span>
                                                    <p className="text-black">{item.gender}</p>
                                                </li>
                                                <li>
                                                    <span className="">
                                                        Country
                                                    </span>
                                                    <p className="text-black">{item.country}</p>
                                                </li>
                                            </ul>
                                            <div className="mt-5">
                                                <h6>Description</h6>
                                                <p className="text-black">{item.description}</p>
                                            </div>
                                            <div className="text-right text-2xl">
                                                <button type="" className="text-red-600" onClick={() => handleOpen(item)}><FaRegTrashAlt /></button>
                                                <button type="" className="text-blue-600 ml-5" onClick={() => edittoggle(item)}> <FaPencilAlt /></button>
                                            </div>
                                        </div>
                                    ) : (
                                        // {edit data}
                                        <div className={``}>
                                            <ul className="grid grid-cols-3 gap-10 py-5">
                                                <li>
                                                    <span>Age</span>
                                                    <input type="number" value={celebrity.dob} className="border bg-transparent w-full p-2 rounded-2xl text-black" onChange={changeHandler} name="dob" />
                                                </li>
                                                <li>
                                                    <span className="">
                                                        Gender
                                                    </span><br />
                                                    <select className="border bg-transparent w-full p-2 rounded-2xl text-black" value={celebrity.gender} name="gender" onChange={changeHandler} >
                                                        <option value="">Select gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Transgender">Transgender</option>
                                                        <option value="Rather not say">Rather not say</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </li>
                                                <li>
                                                    <span className="">
                                                        Country
                                                    </span>
                                                    <input type="text" value={celebrity.country} className="border bg-transparent w-full p-2 rounded-2xl text-black" onChange={changeHandler} name='country' />
                                                </li>
                                            </ul>
                                            <div className="mt-5">
                                                <h6>Description</h6>
                                                <textarea name="description" id="" rows={4}
                                                    className="border bg-transparent w-full p-2 rounded-2xl text-black" value={celebrity.description} onChange={changeHandler} />
                                            </div>
                                            <div className="text-right text-2xl">
                                                <button type="" className="text-red-600" onClick={closeHandler}><LuXCircle /></button>
                                                <button type="" className="text-green-800 ml-5"
                                                    onClick={() => {
                                                        savehandler(item)
                                                    }}

                                                    disabled={!isChanged}><FaRegCircleCheck />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        )
                    }

                    )
                }
            </div>
            <Modal isOpen={isOpen} onClose={closeHandler}>
                <div className="text-right ">
                    <button className="px-3 py-1 border border-black rounded-lg" onClick={closeHandler}>cancel</button>
                    <button className="ml-4 bg-red-600 px-3 py-1 text-white rounded-lg" onClick={() => { deleteHandler(deletid) }}>Delete</button>
                </div>

            </Modal>
        </div >

    )
}



export default Accordion;