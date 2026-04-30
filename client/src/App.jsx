import { useEffect, useState } from "react";
import {
  Header,
  Auth,
  Car,
  CardSkeleton,
  AddCar,
  EditCar,
  DeleteCar,
  Footer,
} from "./components";
import { getCars } from "./services";

const App = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState({ isEditing: false, carId: null });
  const [openDelete, setOpenDelete] = useState({
    isDeleting: false,
    carId: null,
  });
  const [onOpenAuth, setOnOpenAuth] = useState({
    isOpen: false,
    modalType: null,
  });

  const handleOpenAuthModal = () => {
    setOnOpenAuth({
      isOpen: true,
      modalType: "login",
    });
  };

  const fetchAllCars = async () => {
    setLoading(true);
    try {
      const response = await getCars();
      if (response && Array.isArray(response)) {
        setCars(response);
      } else {
        console.error("Something went wrong while fetching cars:", response);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
      setIsOpen(false);
      setOpenEdit({ isEditing: false, carId: null });
      setOpenDelete({ isDeleting: false, carId: null });
    }
  };

  useEffect(() => {
    fetchAllCars();
  }, []);

  return (
    <div>
      <Header
        onAddClick={() => setIsOpen(true)}
        onOpenAuthModal={handleOpenAuthModal}
        fetchAllCars={fetchAllCars}
      />

      <main>
        <div className="main-header">
          <h3>Latest Cars 🚘</h3>
          <div className="main-actions">
            <span type="button" onClick={fetchAllCars}>
              🔄️
            </span>
            {/* <span type="button" onClick={() => setIsOpen(true)}>
              ➕
            </span> */}
          </div>
        </div>

        {onOpenAuth.isOpen && (
          <Auth
            onOpenAuth={onOpenAuth}
            onClose={() => setOnOpenAuth({ isOpen: false, modalType: null })}
            setOnOpenAuth={setOnOpenAuth}
          />
        )}

        {isOpen && (
          <AddCar onClose={() => setIsOpen(false)} onCarAdded={fetchAllCars} />
        )}

        {openEdit.isEditing && (
          <EditCar
            carId={openEdit.carId}
            onClose={() => setOpenEdit({ isEditing: false, carId: null })}
            onCarUpdated={fetchAllCars}
          />
        )}

        {openDelete.isDeleting && (
          <DeleteCar
            carId={openDelete.carId}
            onClose={() => setOpenDelete({ isDeleting: false, carId: null })}
            onCarDeleted={fetchAllCars}
          />
        )}

        {loading ? (
          <CardSkeleton />
        ) : (
          <ul>
            {cars && cars.length > 0 ? (
              cars.map((car) => (
                <Car
                  key={car.id}
                  handleDelete={() =>
                    setOpenDelete({ isDeleting: true, carId: car.id })
                  }
                  onEditOpen={() =>
                    setOpenEdit({ isEditing: true, carId: car.id })
                  }
                  {...car}
                />
              ))
            ) : (
              <p>No cars available.</p>
            )}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
