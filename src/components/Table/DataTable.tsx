import React, { useState, useRef } from 'react';
import { Result } from '../../interfaces/RandomUser';
import Filters from '../Filters';
import Pagination from '../Pagination/Pagination';
import ResultsPerPage from '../Pagination/ResultsPerPage';
import SearchBar from '../SearchBar';
import ActionButtons from '../ActionButtons';
import TableSkeleton from './TableSkeleton';
import EditModal from '../Modal/EditModal';
import ViewModal from '../Modal/ViewModal';
import { useUsers } from '../../hooks/useUsers';
import './DataTable.css';
import UserTable from './UserTable';

const DataTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(20);
  const [filters, setFilters] = useState<{ gender: string; nat: string }>({ gender: '', nat: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<Result | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [editedUsers, setEditedUsers] = useState<{ [key: string]: Result }>({});
  const searchBarRef = useRef<{ reset: () => void }>(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const { data, totalPages, isLoading } = useUsers({ page, resultsPerPage, filters });

  const filteredData = data
    .filter(user => !deletedIds.includes(user.login.uuid))
    .map(user => (editedUsers[user.login.uuid] ? editedUsers[user.login.uuid] : user))
    .filter(user => 
      user.name.first.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.name.last.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleFilterChange = (newFilters: { gender: string; nat: string }) => {
    setFilters(newFilters);
    setPage(1); 
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    searchBarRef.current?.reset(); 
  };

  const handleResultsPerPageChange = (newResultsPerPage: number) => {
    setResultsPerPage(newResultsPerPage);
    setPage(1); 
    searchBarRef.current?.reset(); 
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
  };

  const handleEdit = (user: Result) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleView = (user: Result) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDelete = () => {
    setDeletedIds(prevDeletedIds => [...prevDeletedIds, ...selectedIds]);
    setSelectedIds([]);
  };

  const handleSaveEdit = (editedUser: Result) => {
    setEditedUsers(prevEditedUsers => ({
      ...prevEditedUsers,
      [editedUser.login.uuid]: editedUser,
    }));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(selectedId => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(user => user.login.uuid));
    }
  };

  return (
    <>
      <ActionButtons onToggleFilters={toggleFilters} onDelete={handleDelete} />
      <SearchBar ref={searchBarRef} onSearch={handleSearch} />
      {filtersVisible && <Filters onFilterChange={handleFilterChange} />}
      <div className="table-responsive" style={{ maxHeight: '50vh', overflowY: 'auto', overflowX: 'auto' }}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <UserTable 
            data={filteredData}
            selectedIds={selectedIds}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAllChange={handleSelectAllChange}
            handleView={handleView}
            handleEdit={handleEdit}
          />
        )}
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3 flex-column flex-md-row">
        <ResultsPerPage resultsPerPage={resultsPerPage} onResultsPerPageChange={handleResultsPerPageChange} />
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
      {isEditModalOpen && <EditModal user={selectedUser} onClose={handleCloseModal} onSave={handleSaveEdit} />}
      {isViewModalOpen && <ViewModal user={selectedUser} onClose={handleCloseModal} />}
    </>
  );
};

export default DataTable;
