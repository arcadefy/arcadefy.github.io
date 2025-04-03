export default function Layout({children}:any) {
    return (
      <>
       <div className='container mx-auto lg:px-32 py-5 px-5'>
        {children}
       </div>
      </>
    );
  }
  