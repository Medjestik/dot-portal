import React from 'react';
import Popup from '../../Popup/Popup.js';
import './CuratorViewStudentPopup.css';
import * as curatorApi from '../../../utils/curatorApi.js';
import * as personApi from '../../../utils/personApi.js';
import PopupSelect from '../../Popup/PopupSelect/PopupSelect.js';

function CuratorViewStudentPopup({
  isOpen,
  onClose,
  currentStudent,
  onStudentUpdated,
  isSaving = false,
  setIsSaving,
  semesterOptions,
  defaultSemesterId,
  groupId,
}) {
  const loginValue = currentStudent?.login ?? '';

  const tabs = [
    { key: 'data', name: 'Данные' },
    { key: 'notifications', name: 'Уведомления' },
  ];
  const [activeTab, setActiveTab] = React.useState('data');

  const [form, setForm] = React.useState({
    last_name: '',
    first_name: '',
    middle_name: '',
    email: '',
    phone: '',
    is_corp: false,
  });

  const [isShowRequestError, setIsShowRequestError] = React.useState({ isShow: false, text: '' });

  const [notifySemesterOptions, setNotifySemesterOptions] = React.useState([]);
  const [selectedNotifySemester, setSelectedNotifySemester] = React.useState(null);
  const [isLoadingSemesters, setIsLoadingSemesters] = React.useState(false);
  const [isNotifySending, setIsNotifySending] = React.useState(false);
  const [notifyStatus, setNotifyStatus] = React.useState({ type: 'idle', text: '' }); // idle|success|error

  React.useEffect(() => {
    if (!isOpen) return;
    setActiveTab('data');
    setForm({
      last_name: currentStudent?.lastname || '',
      first_name: currentStudent?.firstname || '',
      middle_name: currentStudent?.middlename || '',
      email: currentStudent?.email || '',
      phone: currentStudent?.phone || '',
      is_corp: Boolean(Number(currentStudent?.is_corp ?? 0)) || Boolean(currentStudent?.is_corp),
    });
    setIsShowRequestError({ isShow: false, text: '' });
    setNotifyStatus({ type: 'idle', text: '' });
  }, [isOpen, currentStudent]);

  React.useEffect(() => {
    if (!isOpen) return;

    const incoming = Array.isArray(semesterOptions) ? semesterOptions : null;
    if (incoming && incoming.length > 0) {
      setNotifySemesterOptions(incoming);
      const preferred =
        incoming.find((o) => String(o.id) === String(defaultSemesterId)) ||
        incoming[incoming.length - 1];
      setSelectedNotifySemester(preferred || null);
      return;
    }

    async function loadFromGroup() {
      if (!groupId) return;
      const token = localStorage.getItem('token');
      if (!token) return;

      setIsLoadingSemesters(true);
      try {
        const disciplines = await curatorApi.getGroupDisciplines({ token, groupId });
        const uniq = disciplines
          .reduce(
            (acc, item) => {
              const semKey = String(item.semestr ?? item.semester_id ?? '');
              if (!semKey || acc.map[semKey]) return acc;
              acc.map[semKey] = true;
              acc.disc.push({ id: item.semester_id, name: 'Семестр ' + item.semestr });
              return acc;
            },
            { map: {}, disc: [] }
          )
          .disc;

        setNotifySemesterOptions(uniq);
        const preferred =
          uniq.find((o) => String(o.id) === String(defaultSemesterId)) || uniq[uniq.length - 1];
        setSelectedNotifySemester(preferred || null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoadingSemesters(false);
      }
    }

    loadFromGroup();
  }, [isOpen, semesterOptions, defaultSemesterId, groupId]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSave() {
    if (!currentStudent?.id) return;
    if (isSaving) return;

    setIsShowRequestError({ isShow: false, text: '' });

    const token = localStorage.getItem('token');
    if (!token) {
      setIsShowRequestError({ isShow: true, text: 'Не найден токен авторизации.' });
      return;
    }

    const payload = {
      lastname: form.last_name,
      firstname: form.first_name,
      middlename: form.middle_name,
      is_corp: Boolean(form.is_corp),
      email: form.email,
      phone: form.phone,
    };

    try {
      setIsSaving?.(true);
      const res = await curatorApi.updateStudentInfo({ token, studentId: currentStudent.id, data: payload });
      onStudentUpdated?.(res);
      onClose?.();
    } catch (err) {
      setIsShowRequestError({ isShow: true, text: 'Не удалось сохранить изменения.' });
      console.error(err);
    } finally {
      setIsSaving?.(false);
    }
  }

  function handleChooseNotifySemester(option) {
    setSelectedNotifySemester(option);
    setNotifyStatus({ type: 'idle', text: '' });
  }

  async function handleNotifyDebts() {
    if (isNotifySending) return;
    if (!currentStudent?.id) {
      setNotifyStatus({ type: 'error', text: 'Не найден student_id.' });
      return;
    }
    if (!selectedNotifySemester?.id) {
      setNotifyStatus({ type: 'error', text: 'Выберите семестр.' });
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setNotifyStatus({ type: 'error', text: 'Не найден токен авторизации.' });
      return;
    }

    setNotifyStatus({ type: 'idle', text: '' });
    try {
      setIsNotifySending(true);
      await personApi.notifyStudentAboutDebts({
        token,
        student_id: currentStudent.id,
        ych_sem: selectedNotifySemester.id,
      });
      setNotifyStatus({
        type: 'success',
        text: 'Если у студента были долги в указанном семестре, то ему отправлено уведомление на портал и на почту',
      });
    } catch (err) {
      console.error(err);
      setNotifyStatus({ type: 'error', text: 'Не удалось отправить уведомление.' });
    } finally {
      setIsNotifySending(false);
    }
  }
  
  return (
    <Popup
    isOpen={isOpen}
    onClose={onClose}
    formWidth={'full'}
    formName={'curator-view-student-popup'}
    >
      <div className='curator-view-student-popup'>
        <h2 className='popup__title popup__title_margin_bottom'>Информация о студенте</h2>

        <ul className='tabs'>
          {tabs.map((t) => (
            <li
              key={t.key}
              className={`tabs__item ${
                activeTab === t.key ? 'tabs__item_type_current' : 'tabs__item_type_active'
              }`}
              onClick={activeTab === t.key ? undefined : () => setActiveTab(t.key)}
            >
              {t.name}
            </li>
          ))}
        </ul>

        {activeTab === 'data' && (
          <>
            <div className='popup__author'>
              {currentStudent.pict_url ? (
                <img className='popup__author-img' src={currentStudent.pict_url} alt='аватар'></img>
              ) : (
                <div className='popup__author-img'></div>
              )}
              <div className='popup__author-info'>
                <div className='popup__row'>
                  <div className='popup__row-item'>
                    <div className='popup__field'>
                      <h4 className='popup__input-caption'>Фамилия</h4>
                      <div className='popup__input-field'>
                        <input
                          className='popup__input'
                          name='last_name'
                          value={form.last_name}
                          onChange={handleChange}
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='popup__row-item'>
                    <div className='popup__field'>
                      <h4 className='popup__input-caption'>Имя</h4>
                      <div className='popup__input-field'>
                        <input
                          className='popup__input'
                          name='first_name'
                          value={form.first_name}
                          onChange={handleChange}
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='popup__row-item'>
                    <div className='popup__field'>
                      <h4 className='popup__input-caption'>Отчество</h4>
                      <div className='popup__input-field'>
                        <input
                          className='popup__input'
                          name='middle_name'
                          value={form.middle_name}
                          onChange={handleChange}
                          type='text'
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='popup__row'>
                  <div className='popup__row-item'>
                    <div className='popup__field'>
                      <h4 className='popup__input-caption'>Логин</h4>
                      <div className='popup__input-field'>
                        <input
                          className='popup__input'
                          value={String(loginValue)}
                          type='text'
                          disabled
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <div className='popup__row-item'>
                    <div className='popup__field'>
                      <h4 className='popup__input-caption'>Почта</h4>
                      <div className='popup__input-field'>
                        <input
                          className='popup__input'
                          name='email'
                          value={form.email}
                          onChange={handleChange}
                          type='email'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='popup__row-item'>
                    <div className='popup__field'>
                      <h4 className='popup__input-caption'>Телефон</h4>
                      <div className='popup__input-field'>
                        <input
                          className='popup__input'
                          name='phone'
                          value={form.phone}
                          onChange={handleChange}
                          type='tel'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='popup__row'>
              <div className='popup__row-item'>
                <label className='popup__row-text'>
                  <input
                    name='is_corp'
                    checked={form.is_corp}
                    onChange={handleChange}
                    type='checkbox'
                  />
                  {' '}Корпоративный студент
                </label>
              </div>
            </div>

            <div className='popup__row'>
              <div className='popup__row-item'>
                <h6 className='popup__row-title popup__row-title_margin_right'>Первое посещение:</h6>
                <p className='popup__row-text'>{currentStudent.first_login || ''}</p>
              </div>
              <div className='popup__row-item'>
                <h6 className='popup__row-title popup__row-title_margin_right'>Последнее посещение:</h6>
                <p className='popup__row-text'>{currentStudent.last_login || ''}</p>
              </div>
            </div>

            <div className='popup__btn_margin_top'></div>

            <div className='popup__btn-container'>
              <button className='popup__btn-cancel' type='button' onClick={onClose}>
                Назад
              </button>
              {isSaving ? (
                <button
                  className='popup__btn-save popup__btn-save_type_loading'
                  disabled
                  type='button'
                >
                  Сохранение..
                </button>
              ) : (
                <button className='popup__btn-save' type='button' onClick={handleSave}>
                  Сохранить
                </button>
              )}
            </div>

            <span
              className={`popup__input-error ${
                isShowRequestError.isShow ? 'popup__input-error_status_show' : ''
              }`}
            >
              {isShowRequestError.text}
            </span>
          </>
        )}

        {activeTab === 'notifications' && (
          <>
            <h3 className='popup__subtitle'>Об академических задолженностях в семестре</h3>
            <div className='popup__row'>
              <div className='popup__row-item curator-view-student-popup__notify-semester'>
                <h4 className='popup__input-caption curator-view-student-popup__notify-semester-label'>
                  Семестр
                </h4>
                {isLoadingSemesters ? (
                  <p className='popup__row-text'>Загрузка семестров…</p>
                ) : notifySemesterOptions.length > 0 && selectedNotifySemester ? (
                  <div className='curator-view-student-popup__notify-select'>
                    <PopupSelect
                      filterType='byId'
                      options={notifySemesterOptions}
                      currentOption={selectedNotifySemester}
                      onChooseOption={handleChooseNotifySemester}
                    />
                  </div>
                ) : (
                  <p className='popup__row-text'>Семестры недоступны.</p>
                )}
              </div>
              <div className='popup__row-item'>
                {isNotifySending ? (
                  <button
                    className='popup__btn-save popup__btn-save_type_loading popup__btn-save_width_fix'
                    disabled
                    type='button'
                  >
                    Отправка..
                  </button>
                ) : (
                  <button
                    className='popup__btn-save popup__btn-save_width_fix'
                    type='button'
                    onClick={handleNotifyDebts}
                    disabled={isLoadingSemesters || !selectedNotifySemester?.id}
                  >
                    Отправить
                  </button>
                )}
              </div>
            </div>
            <hr className='curator-view-student-popup__hr' />

            <div className='popup__btn_margin_top'></div>

            <div className='popup__btn-container'>
              <button className='popup__btn-cancel' type='button' onClick={onClose}>
                Назад
              </button>
            </div>

            <span
              className={`popup__input-error ${
                notifyStatus.type === 'error' ? 'popup__input-error_status_show' : ''
              }`}
            >
              {notifyStatus.type === 'error' ? notifyStatus.text : ''}
            </span>
            <span
              className={`popup__input-success ${
                notifyStatus.type === 'success' ? 'popup__input-success_status_show' : ''
              }`}
            >
              {notifyStatus.type === 'success' ? notifyStatus.text : ''}
            </span>
          </>
        )}
      </div>

    </Popup>
  )
}

export default CuratorViewStudentPopup;