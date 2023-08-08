import { showFormattedDate } from '../utils/index.js';

export default function Card(props) {
  const renderedElement = [];

  const archivedHandler = (_id) => {
    const updatedData = props.dataObject.map(currProps => {
      if(currProps.id === _id){
        return { ...currProps, archived: !currProps.archived };
      }
      return currProps;
    });
    props.setFunc(updatedData);
  }

  const deleteHandler = (_id) => {
    const removeData = props.dataObject.filter((curr)=> curr.id !== _id);
    props.setFunc(removeData);
  }

  props.dataObject
    .filter((curr) => curr.title.toLowerCase().includes(props.filter.toLowerCase()))
    .map((currProps) => {
    if((props.viewType == 'active' && currProps.archived == false) || (props.viewType == 'archived' && currProps.archived == true)){
      renderedElement.push (
        <div
          key={ currProps.id }
          className='w-1/4 p-3 flex flex-col rounded-md text-left m-4 shadow-md ease-in-out duration-300 hover:shadow-xl'>
          <div>
            <h1 className='font-bold text-xl mb-2'>{ currProps.title }</h1>
            <h3 className='opacity-60 text-sm font-lg'>{ showFormattedDate(currProps.createdAt) }</h3>
          </div>
          <div className='mt-3 h-56'>
            <p>{ currProps.body }</p>
          </div>
          <div className='mt-5 flex flex-row items-center'>
            <button className='text-xs p-3 shadow-md rounded-full w-32 m-2 bg-primary_red hover:bg-accent_red ease-in-out duration-300'
              onClick={() => { deleteHandler(currProps.id); }}
            >
              HAPUS
            </button>
            <button className='text-xs p-3 shadow-md rounded-full w-32 m-2 bg-primary hover:bg-accent ease-in-out duration-300'
              onClick={() => { archivedHandler(currProps.id); }}
            >
              { (props.viewType == 'active' && currProps.archived == false) ? ('ARSIPKAN') : ('PINDAHKAN') }
            </button>
          </div>
        </div>
      )
    }
  })
  if(renderedElement.length == 0){
    return (
      <div>
        <h2 className='text-2xl'>Tidak ada catatan</h2>
      </div>
    )
  }
  return renderedElement;
}

