import { useCurrentUserQuery } from "../../auth/queries/useCurrentUserQuery";

function ProfileInfoCard() {
  const { data: user, isLoading, isError } = useCurrentUserQuery();

  if (isLoading) {
    return <div>Cargando datos del usuario...</div>;
  }

  if (isError || !user) {
    return <div>No se pudieron cargar los datos del usuario.</div>;
  }

  return (
    <section className="rounded-[10px] bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-[22px] font-bold text-black">
        Información del usuario
      </h2>

      <div className="grid gap-4">
        <div>
          <p className="text-[14px] text-gray-500">Correo institucional</p>
          <p className="text-[16px] font-semibold text-black">{user.email}</p>
        </div>

        <div>
          <p className="text-[14px] text-gray-500">Institución</p>
          <p className="text-[16px] font-semibold text-black">
            Pendiente de backend
          </p>
        </div>

        <div>
          <p className="text-[14px] text-gray-500">Dependencia</p>
          <p className="text-[16px] font-semibold text-black">
            {user.departmentName}
          </p>
        </div>

        <div>
          <p className="text-[14px] text-gray-500">Rol en sistema</p>
          <p className="text-[16px] font-semibold text-black">{user.role}</p>
        </div>

        <div>
          <p className="text-[14px] text-gray-500">Contraseña</p>
          <p className="text-[16px] font-semibold text-black">********</p>
        </div>
      </div>
    </section>
  );
}

export default ProfileInfoCard;
