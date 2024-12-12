package bangkit.mobiledev.cek_apel.ui.scan

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import bangkit.mobiledev.cek_apel.database.entity.ScanHistoryEntity
import bangkit.mobiledev.cek_apel.database.repository.ScanHistoryRepository
import bangkit.mobiledev.cek_apel.database.room.ScanHistoryDatabase
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.launch

class DetailHistoryViewModel(application: Application) : AndroidViewModel(application) {
    private val repository: ScanHistoryRepository
    private val _scanHistoryItem = MutableLiveData<ScanHistoryEntity>()
    val scanHistoryItem: LiveData<ScanHistoryEntity> = _scanHistoryItem

    init {
        val userId = FirebaseAuth.getInstance().currentUser?.uid ?: "default_user"
        val scanHistoryDao = ScanHistoryDatabase.getDatabase(application, userId).scanHistoryDao()
        repository = ScanHistoryRepository(scanHistoryDao)
    }

    fun loadScanHistoryById(id: Long) = viewModelScope.launch {
        _scanHistoryItem.value = repository.getScanHistoryById(id)
    }
}