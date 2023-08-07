import { showFormattedDate } from '../utils/data';

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
    const removeData = props.dataObject.map(currProps => {
      if(currProps.id === _id){
        return { }
      }
      return currProps;
    });
    props.setFunc(removeData);
  }

  props.dataObject.map((currProps) => {
    if(props.viewType == 'active' && currProps.archived == false){
      renderedElement.push (
        <div key={ currProps.id } className='border w-1/4 p-3 flex flex-col text-left m-3'>
          <div>
            <h1 className='font-bold text-xl mb-2'>{ currProps.title }</h1>
            <h3 className='opacity-60 text-sm font-lg'>{ showFormattedDate(currProps.createdAt) }</h3>
          </div>
          <div className='mt-3 h-1/2'>
            <p>{ currProps.body }</p>
          </div>
          <div className='mt-5 border flex flex-row items-center'>
            <button className='p-3 border rounded-full w-32 m-2 bg-red-400'
              onClick={() => { deleteHandler(currProps.id); }}
            >
              HAPUS
            </button>
            <button className='p-3 border rounded-full w-32 m-2 bg-yellow-300'
              onClick={() => { archivedHandler(currProps.id); }}
            >
              ARSIPKAN
            </button>
          </div>
        </div>
      )
    } else if(props.viewType == 'archived' && currProps.archived == true){
      renderedElement.push (
        <div key={ currProps.id } className='border w-1/4 p-3 flex flex-col text-left m-3'>
          <div>
            <h1 className='font-bold text-xl mb-2'>{ currProps.title }</h1>
            <h3 className='opacity-60 text-sm font-lg'>{ showFormattedDate(currProps.createdAt) }</h3>
          </div>
          <div className='mt-3 h-1/2'>
            <p>{ currProps.body }</p>
          </div>
          <div className='mt-5 border flex flex-row items-center'>
            <button className='p-3 border rounded-full w-32 m-2 bg-red-400'
              onClick={() => { deleteHandler(currProps.id); }}
            >
              HAPUS
            </button>
            <button className='p-3 border rounded-full w-32 m-2 bg-yellow-300'
              onClick={() => { archivedHandler(currProps.id); }}
            >
              PINDAHKAN
            </button>
          </div>
        </div>
      )
    }
  })

  return renderedElement;
}

