import * as XLSX from 'xlsx';

function formatMark(mark) {
  if (mark === 'Не аттестован') {
    return 'Н/А';
  }
  if (mark === 'Нет оценки' || mark === 'Без оценки') {
    return 'Нет оценки';
  }
  if (mark === 'Отлично') {
    return '5 (отл.)';
  }
  if (mark === 'Хорошо') {
    return '4 (хор.)';
  }
  if (mark === 'Удовлетворительно') {
    return '3 (удов.)';
  }
  return mark || '';
}

function getLastCommentText(comments) {
  if (!Array.isArray(comments) || comments.length === 0) {
    return 'Нет комментария';
  }
  const last = comments[comments.length - 1];
  return (last && last.text) ? String(last.text) : 'Нет комментария';
}

function sanitizeFileNamePart(value) {
  return String(value || 'discipline')
    .replace(/[\\/:*?"<>|]/g, '_')
    .replace(/\s+/g, '_')
    .slice(0, 80);
}

function buildSheetRows(students, includeCourseWork) {
  const headers = ['№', 'ФИО студента', 'Время', 'Тест', 'Файлы', 'Оценка'];
  if (includeCourseWork) {
    headers.push('Курсовая');
  }
  headers.push('Комментарий');

  const rows = (students || []).map((item, index) => {
    const row = [
      index + 1,
      item?.student?.fullname || '',
      item?.learning?.content_time || '',
      `${item?.learning?.completed_tests_count ?? 0}/${item?.learning?.total_tests_count ?? 0}`,
      item?.files?.length ?? 0,
      formatMark(item?.mark?.name),
    ];

    if (includeCourseWork) {
      row.push(formatMark(item?.course_mark?.name));
    }

    row.push(getLastCommentText(item?.comments));
    return row;
  });

  return [headers, ...rows];
}

/**
 * Экспорт списка студентов дисциплины в Excel (.xlsx).
 * @param {Object} params
 * @param {Array} params.students — массив студентов (как disciplineStudents / filteredStudents)
 * @param {Object} params.disciplineInfo — объект дисциплины (name, course_work)
 * @param {string} [params.groupName] — название группы для имени файла
 */
export function exportDisciplineStudentsToExcel({ students, disciplineInfo, groupName }) {
  const list = Array.isArray(students) ? students : [];
  if (list.length === 0) {
    return;
  }

  const includeCourseWork = Boolean(disciplineInfo?.course_work);
  const sheetData = buildSheetRows(list, includeCourseWork);
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Студенты');

  const disciplinePart = sanitizeFileNamePart(disciplineInfo?.name);
  const groupPart = groupName ? `_${sanitizeFileNamePart(groupName)}` : '';
  const datePart = new Date().toISOString().slice(0, 10);
  const fileName = `students_${disciplinePart}${groupPart}_${datePart}.xlsx`;

  XLSX.writeFile(workbook, fileName);
}
