export const formatDateLocation = (date: string = '') => {
  try {
    const _date = new Date(date);
    const _day = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(_date);
    const [day, time] = _day.split(', ');

    return `${time} • ${day}`;
  } catch (err) {
    return '-';
  }
};
