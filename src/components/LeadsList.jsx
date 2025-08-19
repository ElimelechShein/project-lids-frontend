import React from 'react';

function LeadsList({ leads }) {
  if (!leads || leads.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-inbox text-muted fs-1 mb-3"></i>
        <p className="text-muted fs-5">אין לידים להצגה כרגע.</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h5 className="card-title mb-0">
          <i className="bi bi-people me-2 text-primary"></i>
          רשימת כל הלידים ({leads.length})
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>שם</th>
                <th>אימייל</th>
                <th>טלפון</th>
                <th>מקור</th>
                <th>קמפיין</th>
                <th>תאריך כניסה</th>
              </tr>
            </thead>
            <tbody>
     
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.utm_source}</td>
                  <td>{lead.utm_campaign}</td>
                 
                  <td>{new Date(lead.createdAt).toLocaleDateString('he-IL')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeadsList;